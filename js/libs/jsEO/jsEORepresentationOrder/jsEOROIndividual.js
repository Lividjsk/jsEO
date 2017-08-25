/* 
 * Copyright (C) 2017 jgg00045
 *
 * Javier Guzmán García: jgg00045@red.ujaen.es
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

var jsEOROIndividual = new Class({
	Extends: jsEOIndividual,
	initialize: function(_integers) {
		this.parent(_integers); // calls initalize method of jsEOIndividual class
		jsEOUtils.debug("Initializating a jsEOROIndividual ");
	},
	randomize: function(_length, _min, _max) {

		if (typeof _length == 'undefined') {
			_length = 10;
		}
		if (typeof _min == 'undefined') {
			_min = 0;
		}
		if (typeof _max == 'undefined') {
			_max = 1;
		}

		var used = new Array(_length);
		var chr = new Array(_length);

		for (var i = 0; i < _length; ++i) {
			used[i] = false;
		}

		var index = 0;
		chr[0] = 0;
		used[0] = true;
		for (var j = 1; j < _length; ++j) {
			do {
				index = jsEOUtils.intRandom(1, _length - 1);
			} while (used[index]);
			chr[j] = index;
			used[index] = true;
		}

		this.setChromosome(chr);
		return this;
	},
	evaluate: function(_fitFn) {
		this.setFitness(_fitFn(this.chromosome));
		return this;
	}
});