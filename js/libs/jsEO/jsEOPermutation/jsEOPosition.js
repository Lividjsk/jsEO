/* 
 * Copyright (C) 2013 vrivas
 * Javier Guzman Garcia: jgg00045@red.ujaen.es
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var jsEOPosition = new Class({

	x: -1,
	y: -1,
	initialize: function(_x, _y) {
		this.x = _x;
		this.y = _y;
	},
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	setX: function(_x) {
		this.x = _x;
		return this;
	},
	setY: function(_y) {
		this.y = _y;
		return this;
	},
	createRandomPosition: function(_length) {
		var position = new jsEOPosition(jsEOUtils.intRandom(1, _length), jsEOUtils.intRandom(1, _length));
		return position;
	},
	setRandomly: function(_length) {
		this.x = jsEOUtils.intRandom(1, _length);
		this.y = jsEOUtils.intRandom(1, _length);
		return this;
	},
	eq: function(position) {
		return this.x === position.getX() && this.y === position.getY();
	},
	kills: function(position) {
		return Math.abs(this.x - position.getX()) === 0 || Math.abs(this.y - position.getY()) == 0 || Math.abs(this.x - position.getX()) === Math.abs(this.y - position.getY());
	},
	getPosition: function() {
		return "{" + this.x + ":" + this.y + "}";
	},
	getJSON: function() {
		return {
			"x": this.x,
			"y": this.y
		};
	}
});