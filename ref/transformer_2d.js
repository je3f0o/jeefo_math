/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : transformer_2d.js
* Created at  : 2018-12-17
* Updated at  : 2018-12-17
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var Matrix_2x2 = require("./matrix_2x2");

module.exports = function Transformer2D (position, orientation, z_index) {
	this.z_index  = z_index || 0;
	this.position = position.clone();
	this.set_orientation(orientation);
};

module.exports.prototype = {
	set_orientation : function (orientation) {
		this.orientation     = orientation;
		this.rotation_matrix = Matrix_2x2.create_rotation_matrix(orientation);
	},

	translate : function (distance) {
		this.position.add(distance);
	},

	rotate : function (angle_in_radian) {
		this.orientation    += angle_in_radian;
		this.rotation_matrix = Matrix_2x2.create_rotation_matrix(this.orientation);
	},

	transform : function (vector2) {
		return this.rotation_matrix.multiply_by_vector2(vector2).add(this.position);
	}
};
