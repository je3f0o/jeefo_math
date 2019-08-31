/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : to_radians.js
* Created at  : 2019-05-02
* Updated at  : 2019-08-13
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

const a_degree_in_radian = Math.PI/180;

/**
 * Convert angle in degrees to radians.
 *
 * @param {number} angle_in_degrees - Anlge in degrees
 * @returns {number} - Angle in radians.
 */
function to_radians (angle_in_degrees) {
    return angle_in_degrees * a_degree_in_radian;
}

module.exports = to_radians;
