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

/**
 * Generate a random floating number between min and max values range.
 *
 * @param {number} min_value - Minimum value.
 * @param {number} max_value - Maximum value.
 *
 * @returns {number} - Random number.
 */
function random_between (min_value, max_value) {
	return random() * (max_value - min_value) + min_value;
}

/**
 * Generate a random integer number between min and max values range.
 *
 * @param {number} min_value - Minimum value.
 * @param {number} max_value - Maximum value.
 *
 * @returns {number} - Random integer number.
 */
function random_int_between (min_value, max_value) {
	return floor(random_between(min_value, max_value));
}

/**
 * Returns a randomly selected element from given array.
 *
 * @param {Array} array - List of elements.
 *
 * @returns {*} - Randomly selected element.
 */
function random_select (array) {
	return array[random_int_between(0, array.length)];
}

exports.select      = random_select;
exports.between     = random_between;
exports.int_between = random_int_between;
