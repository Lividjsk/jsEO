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

var jsEOMOIndividual = new Class({
    Extends: jsEOMOIndividual,
    matrixObjectives: [],
    crowding: 0,
    np: 0,
    sp: [],
    rank: -1,
    initialize: function (_chromosome) {
        this.parent(_chromosome); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOMOIndividual ");
		this.np = 0;
		this.sp = [];
		this.rank = -1;

    },
    randomize: function (_length, _min, _max) {

        if (typeof _length == 'undefined') {
            _length = 10;
        }
        if (typeof _min == 'undefined') {
            _min = 0;
        }
        if (typeof _max == 'undefined') {
            _max = 1;
        }

        var used = [];
        var chr = [];

        for (var i = 0; i < _length; ++i) {
            used.push(false);
        }

        var index = 0;
        for (var j = 0; j < _length; ++j) {
            if (j != 0) {
                do {
                    index = jsEOUtils.intRandom(1, _length - 1);
                } while (used[index]);
            }
            chr.push(index);
            used[index] = true;
        }

        this.setChromosome(chr);
        return this;
    },
	evaluate: function(_fitFn) {
        var objectives = _fitFn(this.chromosome);

        for (var i = 0; i < objectives.length; ++i) {
            this.matrixObjectives.push(objectives[i]);
        }
        return this;
    }
});
