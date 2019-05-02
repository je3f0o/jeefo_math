/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : vector2.js
* Created at  : 2017-10-02
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

const { min, max, cos, sin, sqrt, atan2 } = Math;

class Vector2 {
	constructor (x = 0, y = x) {
		this.x = x;
		this.y = y;
	}

	// Arithmetic operators
	add (other) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}
	subtract (other) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}
	scale (scaler) {
		this.x *= scaler;
		this.y *= scaler;
		return this;
	}
	divide (divider) {
		this.x /= divider;
		this.y /= divider;
		return this;
	}
	add_scaled_vector (vector, scaler) {
		this.x += vector.x * scaler;
		this.y += vector.y * scaler;
		return this;
	}

	// Linear interpolation
	lerp (other, alpha) {
		return this.scale(1 - alpha).add_scaled_vector(other, alpha);
	}

	// Trigonometry
	perp_cw   () { return new Vector2(this.y, -this.x);  }
	perp_ccw  () { return new Vector2(-this.y,  this.x); }
	get_angle () { return atan2(this.y, this.x); }
	set_angle (angle) {
		const length = this.get_length();
		this.x = cos(angle) * length;
		this.y = sin(angle) * length;
	}
	set_length (length) {
		const angle = this.get_angle();
		this.x = cos(angle) * length;
		this.y = sin(angle) * length;
	}
	dot   (other) { return this.x*other.x   +   this.y*other.y; }
	cross (other) { return this.x*other.y   -   this.y*other.x; }
	get_length () {
		// Unoptimized
		// length_squared is same as = dot product to itself
		// return sqrt(this.length_squared());

		// Optimized
		const sum = this.x*this.x   +   this.y*this.y;
		return sum ? sqrt(sum) : 0;
	}
	length_squared () { return this.dot(this); }
	normalize () {
		const length = this.get_length();

		if (length) {
			const inverse_length = 1 / length;
			this.x *= inverse_length;
			this.y *= inverse_length;
		}

		return this;
	}
	get_direction () {
		const length = this.get_length();

		if (length) {
			const inverse_length = 1 / length;
			return new Vector2(
				this.x * inverse_length,
				this.y * inverse_length
			);
		}

		return new Vector2();
	}
	distance (other) {
		// Unoptimized
		//var distance_vector = Vector2.subtract(other, this);
		//return distance_vector.length();

		// Optimized
		return sqrt(
			(other.x - this.x) * (other.x - this.x) +
			(other.y - this.y) * (other.y - this.y));
	}

	// Utils
	to (other) {
		return new Vector2(
			other.x - this.x,
			other.y - this.y);
	}
	negate () {
		this.x *= -1;
		this.y *= -1;
		return this;
	}
	equal_to (other) { return this.x === other.x && this.y === other.y; }
	clone () { return new Vector2(this.x, this.y); }

	set (x, y = x) { // jshint ignore:line
		this.x = x;
		this.y = y;
		return this;
	}

	toString () { return `vec2<${ this.x.toFixed(2) }, ${ this.y.toFixed(2) }>`; }

	// Statics
	static add (left, right) {
		return new Vector2(
			left.x + right.x,
			left.y + right.y);
	}
	static add_value (left, value) {
		return new Vector2(
			left.x + value,
			left.y + value);
	}
	static subtract (left, right) {
		return new Vector2(
			left.x - right.x,
			left.y - right.y);
	}
	static scale (vector, scaler_x, scaler_y = scaler_x) {
		return new Vector2(
			vector.x * scaler_x,
			vector.y * scaler_y);
	}
	static divide (vector, divider) {
		return new Vector2(
			vector.x / divider,
			vector.y / divider);
	}
	static get_length (x, y) {
		const sum = x*x  +  y*y;
		return sum ? sqrt(sum) : 0;
	}
	static normalize (vector) {
		const length = vector.get_length();
		if (length) {
			const inverse_length = 1 / length;
			return new Vector2(
				vector.x * inverse_length,
				vector.y * inverse_length);
		}

		return new Vector2();
	}
	static cross (a, b) {
		if (a instanceof Vector2) {
			return new Vector2(a.y * b, -a.x * b);
		}
		return new Vector2(-b.y * a, b.x * a);
	}
	static min (...vectors) {
		return new Vector2(
			min.apply(null, vectors.map(v => v.x)),
			min.apply(null, vectors.map(v => v.y))
		);
	}
	static max (...vectors) {
		return new Vector2(
			max.apply(null, vectors.map(v => v.x)),
			max.apply(null, vectors.map(v => v.y))
		);
	}
	static distance_squared (a, b) {
		var c = Vector2.subtract(a, b);
		return c.dot(c);
	}
	static lerp (source, destination, alpha) {
		return Vector2.scale(source, 1 - alpha)
			          .add_scaled_vector(destination, alpha);
	}
	static assign (left, right) {
		left.x = right.x;
		left.y = right.y;
	}
	static from_object (object) {
		return new Vector2(object.x, object.y);
	}
}

Vector2.prototype.magnitude         = Vector2.prototype.length;
Vector2.prototype.magnitude_squared = Vector2.prototype.length_squared;

module.exports = Vector2;
