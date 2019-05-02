/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : random.js
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

const { floor, random } = Math;

function random_between (min_value, max_value) {
	return random() * (max_value - min_value) + min_value;
}

function random_int_between (min_value, max_value) {
	return floor(random_between(min_value, max_value));
}

function random_select (array) {
	return array[random_int_between(0, array.length)];
}

exports.select      = random_select;
exports.between     = random_between;
exports.int_between = random_int_between;
