/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : line_segment.js
* Created at  : 2019-05-15
* Updated at  : 2019-05-15
* Author      : jeefo
* Purpose     :
* Description :
* -----------------------------------------------------------------------------
* Calculus slope formula:
*
* Quote reference from: https://en.wikipedia.org/wiki/Slope
* <
* Slope is often denoted by the letter m; there is no clear answer to the
* question why the letter m is used for slope, but it might be from the
* "m for multiple" in the equation of a straight line:
*
* "y = mx + b" or "y = mx + c"
* >
*
* Denotations:
* m = slope
* b = bias
* y = slope * x + bias
*
* slope = height / width
*
* So:
* if p1 = vec2(2, 2) and p2 = vec2(6, 4) then we can use Standard formula.
* { x = 4, y = 2 } = delta = p2 - p1
* slope = delta.y / delta.x = 0.5
*
* Plug it into slope formula:
* y = slope*x + bias
*
* p1:
* 2 = slope*2 + bias1
* 2 - slope*2 = bias1
* 2 - 0.5*2 = bias1
* bias1 = 2 - 1 = 1
*
* p2:
* 4 = slope*6 + bias
* 4 - slope*6 = bias
* 4 - 0.5*6 = bias
* bias2 = 4 - 3 = 1
*
* -----------------------------------------------------------------------------
* Standart line formula:
*
* Ax + By = C
*
* [x, y] vector is intersection point.
* Which means [x, y] components are constant during calculations.
* A,B,C are integers and A must be positive.
*
* Denotations:
* A = slope
* C = bias
*
* if
* x = 2, y = 2, slope = 0.5 and bias = 1 then:
* slope * x + By = bias
* bias = slope*x + By
* 1  = 0.5*2 + By
* By = 0.5*2 - 1 = 0
*
* By must be 0 to find satisfied intersected x value.
* Ax must be 0 to find satisfied intersected y value.
* Algorithm:
*
* Step 1:
*
* A1*x + B1*y = C1 // line 1
* A2*x + B2*y = C2 // line 2
* ==========================
*
* Step 2:
* Multiply by other's B value for both side and subtract.
* Which cancels y value from equations.
*
*   A1*B2*x + B1*B2*y = C1*B2
* -
*   A2*B1*x + B1*B2*y = C2*B1
*   -------------------------
*   A1*B2*x - A2*B1*x = C1*B2 - C2*B1
* ===================================
*
* Step 3:
* Rearrange it
*
* x * (A1*B2 - A2*B1) = C1*B2 - C2*B1
* ===================================
*
* Step 4:
* Solving x value.
* x = (C1*B2 - C2*B1) / (A1*B2 - A2*B1)
*
* Step 5:
* Do the same thing from step 2-4.
* But multiply by other's B value for both side and subtract.
* Which cancels x value from equations and resolve y.
*
* Note: Step 4 denominator is same for both x and y formulas.
*
* -----------------------------------------------------------------------------
* Reference   : https://www.youtube.com/watch?v=A86COO8KC58
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const Vector2 = require("../vector2");

/**
 * Calculating ray intersection using standard line formula:
 * `y = mx + b` and `Ax + By = C`
 * If theta angle between 2 ray slope is not 0 then:
 * it will be calculate intersected point and return it.
 * If theta angle between 2 ray slope is 0 then:
 * it will be returns null.
 * Which means given 2 rays never will be intersected in 2D plane.
 *
 * @param {Vector2} p0 - First ray's origin.
 * @param {Vector2} p1 - First ray's direction.
 * @param {Vector2} p2 - Second ray's origin.
 * @param {Vector2} p3 - Second ray's direction.
 *
 * @returns {Vector2 | null} - Intersection point or nothing.
 */
function between_ray (p0, p1, p2, p3) {
    /* Simplified version
     * How is that simplified exactly?
     * I don't know. xD
     * But it looks like bunch of cross products to me.
     * So I wrote it.
     *
     * const xs = new Vector2(p1.x - p2.x, p3.x - p4.x);
     * const ys = new Vector2(p2.y - p1.y, p4.y - p3.y);
     * const C  = new Vector2((A.x * p1.x) + (B.x * p1.y), (A.y * p3.x) + (B.y * p3.y));
     *
     * const denominator = xs.cross(ys);
     * return new Vector2(
     *     C.cross(xs) / denominator,
     *     ys.cross(C) / denominator
     * );
     */

    // Step 1:
    // Calculate A1, B1, C1, A2, B2, C2
    const A1 = p1.y - p0.y;
    const B1 = p0.x - p1.x;
    const C1 = (A1 * p0.x) + (B1 * p0.y);

    const A2 = p3.y - p2.y;
    const B2 = p2.x - p3.x;
    const C2 = (A2 * p2.x) + (B2 * p2.y);

    const denominator = (A1 * B2) - (A2 * B1);

    if (denominator === 0) {
        return null;
    }

    return new Vector2(
        ((C1 * B2) - (C2 * B1)) / denominator,
        ((C2 * A1) - (C1 * A2)) / denominator
    );
}

/**
 * Calculating line segments intersection point using standard line formula.
 * `y = mx + b` and `Ax + By = C`
 * If 2 line segments intersected in some point it will be calculate that point
 * and return it. Otherwise returns null. Which means given 2 line segments
 * are not intersected.
 *
 * @param {Vector2} p0 - First line segment's origin.
 * @param {Vector2} p1 - First line segment's direction.
 * @param {Vector2} p2 - Second line segment's origin.
 * @param {Vector2} p3 - Second line segment's direction.
 *
 * @returns {Vector2 | null} - Intersection point or nothing.
 */
function between_line_segments (p0, p1, p2, p3) {
    const A1 = p1.y - p0.y;
    const B1 = p0.x - p1.x;
    const C1 = p0.x * A1 + p0.y * B1;

    const A2 = p3.y - p2.y;
    const B2 = p2.x - p3.x;
    const C2 = p2.x * A2 + p2.y * B2;

    const denominator = A1 * B2 - A2 * B1;

    if (denominator !== 0) {
        const intersect_x = (B2 * C1 - B1 * C2) / denominator;
        const intersect_y = (A1 * C2 - A2 * C1) / denominator;

        // Ratio
        const rx0 = (p0.x !== p1.x) ? (intersect_x - p0.x) / (p1.x - p0.x) : -1;
        const ry0 = (p0.y !== p1.y) ? (intersect_y - p0.y) / (p1.y - p0.y) : -1;

        const rx1 = (p2.x !== p3.x) ? (intersect_x - p2.x) / (p3.x - p2.x) : -1;
        const ry1 = (p2.y !== p3.y) ? (intersect_y - p2.y) / (p3.y - p2.y) : -1;

        if ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1) &&
            (rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1)) {
            return new Vector2(intersect_x, intersect_y);
        }
    }

    return null;
}

module.exports = { between_ray, between_line_segments };
