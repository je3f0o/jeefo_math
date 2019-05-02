/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2018-10-18
* Updated at  : 2019-05-02
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const random = require("./random");

module.exports = {
    clamp                   : require("./clamp"),
	to_radians              : require("./to_radians"),

    random_select           : random.select,
    random_between          : random.between,
    random_int_between      : random.int_between,

	Vector2                 : require("./vector2"),
	TransformationMatrix2DH : require("./transformation_matrix_2dh"),
};
