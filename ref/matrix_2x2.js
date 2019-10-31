/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : matrix_2x2.js
* Created at  : 2018-10-11
* Updated at  : 2018-12-15
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

if (require.main) {
	global.PP = {
		define : function (name, fn) {
			return fn;
		}
	};
}

var GET_DETERMINANT = PP.define("GET_DETERMINANT", function (matrix) {
	return (matrix.a * matrix.d) - (matrix.b * matrix.c);
}, true);

// ignore:end

var cos     = Math.cos,
	sin     = Math.sin,
	Vector2 = require("./vector2");

/**
 * Creates a new matrix with explicit components.
 */
var Matrix2x2 = function (a, b, c, d) {
 /* (X) base vector     |     (Y) base vector */
	this.a = a;      /* | */  this.b = b;
	this.c = c;      /* | */  this.d = d;
};

Matrix2x2.prototype = {
	multiply_by_vector2 : function (vector2) {
		return new Vector2(
			this.a * vector2.x + this.b * vector2.y,
			this.c * vector2.x + this.d * vector2.y
		);
	},

	get_determinant : function () {
		return GET_DETERMINANT(this);
	},

	/**
	 * Returns a new matrix containing the inverse of this matrix.
	 * */
	get_inverse : function () {
		// The determinant of Collision Matrix.
		var determinant = GET_DETERMINANT(this);

		return new Matrix2x2(
			 this.d / determinant, -this.b / determinant,
			-this.c / determinant,  this.a / determinant
		);
	},

	/**
	 * Returns a new matrix containing the inverse of this matrix.
	 * */
	invert : function () {
		// The determinant of Collision Matrix.
		var determinant = GET_DETERMINANT(this);

		var a = this.d;

		this.a =  this.d / determinant; this.b = -this.b / determinant;
		this.c = -this.c / determinant; this.d =       a / determinant;

		return this;
	},

	/**
	 * Does a component-wise addition of this matrix and the given
	 * matrix.
	 */
	add : function (other) {
		this.a += other.a;
		this.b += other.b;
		this.c += other.c;
		this.d += other.d;
		return this;
	},

	/**
	 * Transform the given vector by this matrix.
	 *
	 * @param vector The vector to transform.
	 */
	transform : function (vector) {
		return new Vector2(
			(vector.x * this.a) + (vector.y * this.b),
			(vector.x * this.c) + (vector.y * this.d)
		);
	},

	/**
	 * Transform the given vector by the transpose of this matrix.
	 *
	 * @param vector The vector to transform.
	 */
	transform_transpose : function (vector) {
		return new Vector2(
			(vector.x * this.a) + (vector.y * this.c),
			(vector.x * this.b) + (vector.y * this.d)
		);
	},


};

// -----------------------------------------------------
// Static methods
// -----------------------------------------------------
Matrix2x2.create_from_vectors = function (base_vector_x, base_vector_y) {
	return new Matrix2x2(
		base_vector_x.x, base_vector_y.x,
		base_vector_x.y, base_vector_y.y
	);
};

Matrix2x2.create_inertia_tensor = function (x, y, inverse_moment_of_inertia) {
	var off_diagnal = inverse_moment_of_inertia * x*y;

	return new Matrix2x2(
		inverse_moment_of_inertia * y*y,                     off_diagnal,
		                    off_diagnal, inverse_moment_of_inertia * x*x
	);
};

Matrix2x2.create_rotation_matrix = function (angle_in_radians) {
	var cos_result = cos(angle_in_radians),
		sin_result = sin(angle_in_radians);

	return new Matrix2x2(
		cos_result, -sin_result,
		sin_result,  cos_result
	);
};

module.exports = Matrix2x2;
// ignore:start
if (require.main === module) {
	var m = new Matrix2x2(1, 1, 1, -1);
	console.log(m.transform({ x : 5, y : 3 }));
	console.log(m.transform_transpose({ x : 5, y : 3 }));
}
// ignore:end
