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
    initialize: function(_floats) {
        this.parent(_floats); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOROIndividual ");
    },
    randomize: function(_length, _min, _max) {
        var chr = new Array();
        if (typeof _length == 'undefined') {
            _length = 8;
        }
        if (typeof _min == 'undefined') {
            _min = 0;
        }
        if (typeof _max == 'undefined') {
            _max = 1;
        }

        for (var i = 0; i < _length; ++i) {
            chr.push(Math.random() * (_max - _min) + _min);
        }
        this.setChromosome(chr);
        return this;
    },
    evaluate: function(_fitFn) {
        this.setFitness(_fitFn(this.chromosome));
        return this;
    }
});

