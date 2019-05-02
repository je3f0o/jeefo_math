/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : matrix_2dh.js
* Created at  : 2019-05-02
* Updated at  : 2019-05-02
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const Vector2           = require("./vector2");
const to_radians        = require("./to_radians");
const { cos, sin, abs } = Math;

// Compares floating point values with some tolerance (epsilon)
const is_equal = (f1, f2) => abs(f1 - f2) < 1e-14;

module.exports = class TransformationMatrix2DH {
    /**
     * 2D homogeneous transformation matrix initialized with given values or
     * identity matrix.
     *
     * @param {number} a - scale x
     * @param {number} b - skew y
     * @param {number} c - skew x
     * @param {number} d - scale y
     * @param {number} e - translate x
     * @param {number} f - translate y
     */
    constructor (a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
        this.a = a; this.c = c; this.e = e;
        this.b = b; this.d = d; this.f = f;
    }

    /** Flips the horizontal values. */
    flip_x () {
        this.a *= -1;
        this.b *= -1;
        return this;
    }

    /** Flips the vertical values. */
    flip_y () {
        this.c *= -1;
        this.d *= -1;
        return this;
    }

    /** Short-hand to reset current matrix to an identity matrix. */
    set_identity () {
        this.a = this.d = 1;
        this.b = this.c = this.e = this.f = 0;
        return this;
    }

    /**
     * Rotates current matrix transformation.
     *
     * @param {number} angle - Angle in radians
     */
    rotate (angle_in_radians) {
        const {a,b,c,d} = this;
        const cos_value = cos(angle_in_radians);
        const sin_value = sin(angle_in_radians);

        this.a = (a *  cos_value)  +  (c * sin_value);
        this.b = (b *  cos_value)  +  (d * sin_value);
        this.c = (a * -sin_value)  +  (c * cos_value);
        this.d = (b * -sin_value)  +  (d * cos_value);
        return this;
    }

    /**
     * Helper method to make a rotation based on an angle in degrees.
     *
     * @param {number} angle - Angle in degrees
     */
    rotate_by_degrees (angle_in_degrees) {
        return this.rotate(to_radians(angle_in_degrees));
    }

    /**
     * Apply scale transformation unified or ununified way.
     *
     * @param {number} scaler_x - Scale factor x or unified scaler
     * @param {number} scaler_y - Scale factor y
     */
    scale (scaler_x, scaler_y = scaler_x) {
        this.a *= scaler_x;
        this.b *= scaler_x;
        this.c *= scaler_y;
        this.d *= scaler_y;
        return this;
    }

    /**
     * Apply scale transformation on x axis.
     *
     * @param {number} scaler_x - Scale factor x
     */
    scale_x (scaler_x) {
        this.a *= scaler_x;
        this.b *= scaler_x;
        return this;
    }

    /**
     * Apply scale transformation on y axis.
     *
     * @param {number} scaler_y - Scale factor y
     */
    scale_y (scaler_y) {
        this.c *= scaler_y;
        this.d *= scaler_y;
        return this;
    }

    /**
     * Apply skew transformation unified or ununified way.
     *
     * @param {number} angle_x - Skew factor x or unified skew
     * @param {number} angle_y - Skew factor y
     */
    skew (angle_x, angle_y = angle_x) {
        const {a,b,c,d} = this;
        this.a += c * angle_x;
        this.b += d * angle_x;
        this.c += a * angle_y;
        this.d += b * angle_y;
        return this;
    }

    /**
     * Apply skew transformation on x axis.
     *
     * @param {number} angle_x - Skew facter x
     */
    skew_x (angle_x) {
        this.c += this.a * angle_x;
        this.d += this.b * angle_x;
        return this;
    }

    /**
     * Apply skew transformation on y axis.
     *
     * @param {number} angle_y - Skew facter y
     */
    skew_y (angle_y) {
        this.a += this.c * angle_y;
        this.b += this.d * angle_y;
        return this;
    }

    /**
     * Set components on the matrix.
     *
     * @param {number} a - Scale x
     * @param {number} b - Skew y
     * @param {number} c - Skew x
     * @param {number} d - Scale y
     * @param {number} e - Translate x
     * @param {number} f - Translate y
     */
    set_transform (a, b, c, d, e, f) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;

        return this;
    }

    /**
     * Apply translate transformation unified or ununified way.
     *
     * @param {number} distance_x - Translation factor x or unified distance
     * @param {number} distance_y - Translation factor y
     */
    translate (distance_x, distance_y = distance_x) {
        this.e += (this.a * distance_x) + (this.c * distance_y);
        this.f += (this.b * distance_x) + (this.d * distance_y);
        return this;
    }

    /**
     * Apply translate transformation on x axis.
     *
     * @param {number} distance_x - Translation factor x
     */
    translate_x (distance_x) {
        this.e += this.a * distance_x;
        this.f += this.b * distance_x;
        return this;
    }

    /**
     * Apply translate transformation on y axis.
     *
     * @param {number} distance_y - Translation factor y
     */
    translate_y (distance_y) {
        this.e += this.c * distance_y;
        this.f += this.d * distance_y;
        return this;
    }

    /**
     * Multiplies matrix components with input values.
     *
     * @param {number} a - Scale x
     * @param {number} b - Skew y
     * @param {number} c - Skew x
     * @param {number} d - Scale y
     * @param {number} e - Translate x
     * @param {number} f - Translate y
     */
    transform (a, b, c, d, e, f) {
        /**
         * matrix order (canvas compatible):
         *
         * ace
         * bdf
         * 001
         */
        this.a = (this.a * a) + (this.c * b);
        this.b = (this.b * a) + (this.d * b);
        this.c = (this.a * c) + (this.c * d);
        this.d = (this.b * c) + (this.d * d);
        this.e = (this.a * e) + (this.c * f) + this.e;
        this.f = (this.b * e) + (this.d * f) + this.f;

        return this;
    }

    /**
     * Apply full transformation to x, y values and returns a new transformed
     * Vector2 instance.
     *
     * @param {number} x - Position x
     * @param {number} y - Position y
     * @returns {Vector2} - A new transformed point.
     */
    apply_to_point (x, y) {
        return new Vector2(
            (x * this.a) + (y * this.c) + this.e,
            (x * this.b) + (y * this.d) + this.f
        );
    }

    /**
     * Apply full transformation to array of points and
     * returns a new transformed array of Vector2 points.
     *
     * @param {Array} points - List of points.
     * @returns {Array}      - A new list of transformed Vector2 points
     */
    apply_to_points (points) {
        return points.map(p => this.apply_to_point(p.x, p.y));
    }

    /**
     * Apply full transformation to an array with x,y value pairs.
     * This method is intended for more performant use where typed arrays are
     * used.
     *
     * @param {Array} points   - Flatten array with x,y value pairs.
     * @returns {Float32Array} - Transformed points.
     */
    apply_to_typed_array (points) {
        const transformed_points = new Float32Array(points.length);

        for (let i = 0, j = 0; i < points.length; i += 2) {
            const p = this.apply_to_point(points[i], points[i+1]);
            transformed_points[j++] = p.x;
            transformed_points[j++] = p.y;
        }

        return transformed_points;
    }

    /**
     * Apply to any canvas 2D context object.
     *
     * @param {CanvasRenderingContext2D} context
     */
    apply_to_context (context) {
        context.setTransform(this.a, this.b, this.c, this.d, this.e, this.f);
        return this;
    }

    /**
     * Copy current matrix transformation.
     *
     * @returns {TransformationMatrix2DH} - A new TransformationMatrix2DH
     *   instance with same values.
     */
    clone () {
        return new TransformationMatrix2DH(
            this.a, this.b, this.c, this.d, this.e, this.f);
    }

    /**
     * Compare two matrices components within epsilon tolerance.
     *
     * @param {TransformationMatrix2DH} m1 - First matrix
     * @param {TransformationMatrix2DH} m2 - Second matrix
     * @returns {boolean}
     */
    static is_equal (m1, m2) {
        return (
            is_equal(m1.a, m2.a) &&
            is_equal(m1.b, m2.b) &&
            is_equal(m1.c, m2.c) &&
            is_equal(m1.d, m2.d) &&
            is_equal(m1.e, m2.e) &&
            is_equal(m1.f, m2.f)
        );
    }

    /**
     * Create an inverse transformation matrix for given matrix. Inverse
     * transformation matrix is cancels the transformation matrix into
     * identity matrix.
     *
     * @returns {TransformationMatrix2DH} - Inverse transformation matrix
     */
    static inverse (matrix) {
        const { a, b, c, d, e, f } = matrix;
        const determinant = (a * d - b * c);

        return new TransformationMatrix2DH(
                          d / determinant,
                         -b / determinant,
                         -c / determinant,
                          a / determinant,
            (c * f - d * e) / determinant,
            (b * e - a * f) / determinant
        );
    }

    /**
     * Interpolate two matrices and produce a new interpolated matrix.
     *
     * @param {TransformationMatrix2DH} m1 - matrix from.
     * @param {TransformationMatrix2DH} m2 - matrix to.
     * @param {number} range - interpolation range.
     *
     * @returns {TransformationMatrix2DH} - new TransformationMatrix2DH
     *   instance with the interpolated values.
     */
    static interpolate (m1, m2, range) {
        return new TransformationMatrix2DH(
            m1.a + (m2.a - m1.a) * range,
            m1.b + (m2.b - m1.b) * range,
            m1.c + (m2.c - m1.c) * range,
            m1.d + (m2.d - m1.d) * range,
            m1.e + (m2.e - m1.e) * range,
            m1.f + (m2.f - m1.f) * range
        );
    }
};
