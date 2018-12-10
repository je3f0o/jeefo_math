/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : vector2.js
* Created at  : 2017-10-02
* Updated at  : 2018-11-05
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var min   = Math.min,
	max   = Math.max,
	cos   = Math.cos,
	sin   = Math.sin,
	sqrt  = Math.sqrt,
	atan2 = Math.atan2;

var Vector2 = function (x, y) {
	switch (arguments.length) {
		case 2 :
			this.x = x;
			this.y = y;
			break;
		case 1 :
			this.x = this.y = x;
			break;
	}
};

Vector2.prototype = {
	_constructor : "Vector2",

	x : 0,
	y : 0,

	toString : function () {
		return `(${ this.x.toFixed(2) }, ${ this.y.toFixed(2) })`;
	},

	set : function (x, y) {
		this.x = x;
		this.y = (y === void 0) ? x : y;
		return this;
	},
	clone : function () {
		return new Vector2(this.x, this.y);
	},

	equal_to : function (other) {
		return this.x === other.x && this.y === other.y;
	},

	// Math functions
	add : function (other) {
		this.x += other.x;
		this.y += other.y;
		return this;
	},
	subtract : function (other) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	},
	scale : function (scaler) {
		this.x *= scaler;
		this.y *= scaler;
		return this;
	},
	divide : function (divider) {
		this.x /= divider;
		this.y /= divider;
		return this;
	},
	add_scaled_vector : function (vector, scaler) {
		this.x += vector.x * scaler;
		this.y += vector.y * scaler;
		return this;
	},

	to : function (other) {
		return new Vector2(
			other.x - this.x,
			other.y - this.y);
	},

	negate : function () {
		return new Vector2(-this.x, -this.y);
	},

	// Linear interpolation
	lerp : function (other, alpha) {
		return Vector2.scale(this, 1 - alpha).add(Vector2.scale(other, alpha));
	},

	// Trigonometry
	perp_cw : function () {
		return new Vector2( this.y, -this.x);
	},
	perp_ccw : function () {
		return new Vector2(-this.y,  this.x);
	},

	get_angle : function () {
		return atan2(this.y, this.x);
	},

	set_angle : function (angle) {
		var length = this.get_length();
		this.x = cos(angle) * length;
		this.y = sin(angle) * length;
	},

	set_length : function (length) {
		var angle = this.get_angle();
		this.x = cos(angle) * length;
		this.y = sin(angle) * length;
	},

	dot : function (other) {
		return this.x * other.x + this.y * other.y;
	},
	cross : function (other) {
		return this.x * other.y - this.y * other.x;
	},
	get_length : function () {
		// Unoptimized
		// length_squared is same as = dot product to itself
		// return sqrt(this.length_squared());

		// Optimized
		var sum = this.x * this.x + this.y * this.y;
		if (sum) {
			return sqrt(sum);
		}
		return 0;
	},
	length_squared : function () {
		return this.dot(this);
	},
	normalize : function () {
		var length = this.get_length();

		if (length) {
			var inverse_length = 1 / length;
			this.x *= inverse_length;
			this.y *= inverse_length;
		}

		return this;
	},
	get_direction : function () {
		var length = this.get_length();

		if (length) {
			var inverse_length = 1 / length;
			return new Vector2(
				this.x * inverse_length,
				this.y * inverse_length
			);
		}

		return new Vector2();
	},
	distance : function (other) {
		// Unoptimized
		//var distance_vector = Vector2.subtract(other, this);
		//return distance_vector.length();

		// Optimized
		return sqrt(
			(other.x - this.x) * (other.x - this.x) +
			(other.y - this.y) * (other.y - this.y));
	},
};

Vector2.prototype.magnitude         = Vector2.prototype.length;
Vector2.prototype.magnitude_squared = Vector2.prototype.length_squared;

// Statics
Vector2.add = function (left, right) {
	return new Vector2(
		left.x + right.x,
		left.y + right.y);
};
Vector2.add_value = function (left, value) {
	return new Vector2(
		left.x + value,
		left.y + value);
};
Vector2.subtract = function (left, right) {
	return new Vector2(
		left.x - right.x,
		left.y - right.y);
};
Vector2.scale = function (vector, scaler) {
	return new Vector2(
		vector.x * scaler,
		vector.y * scaler);
};
Vector2.divide = function (vector, divider) {
	return new Vector2(
		vector.x / divider,
		vector.y / divider);
};
Vector2.get_length = function (x, y) {
	var sum = x * x + y * y;
	if (sum) {
		return sqrt(sum);
	}
	return 0;
};
Vector2.normalize = function (vector) {
	var length = vector.get_length();
	if (length) {
		var inverse_length = 1 / length;

		return new Vector2(
			vector.x * inverse_length,
			vector.y * inverse_length);
	}

	return new Vector2();
};
Vector2.cross = function (a, b) {
	if (a._constructor === "Vector2") {
		return new Vector2(a.y * b, -a.x * b);
	}
	return new Vector2(-b.y * a, b.x * a);
};
Vector2.min = function (a, b) {
	return new Vector2(
		min(a.x, b.x),
		min(a.y, b.y));
};
Vector2.max = function (a, b) {
	return new Vector2(
		max(a.x, b.x),
		max(a.y, b.y));
};
Vector2.distance_squared = function (a, b) {
	var c = Vector2.subtract(a, b);
	return c.dot(c);
};
Vector2.lerp = function (source, destination, alpha) {
	return Vector2.scale(source, 1 - alpha).add(Vector2.scale(destination, alpha));
};
Vector2.assign = function (left, right) {
	left.x = right.x;
	left.y = right.y;
};

module.exports = Vector2;
