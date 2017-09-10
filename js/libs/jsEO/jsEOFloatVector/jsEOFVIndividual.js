/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
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



/**
* Individual for FloatVector
*
* @class jsEOFVIndividual
*/
var jsEOFVIndividual = new Class({
    Extends: jsEOIndividual,
    /**
     * Initialization of the individual
     * @method initialize
     * @param {Array} _floats
     * @return null
     */
    initialize: function(_floats) {
        this.parent(_floats); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOFVIndividual ");
    },
    /**
     * Creating an individual randomly
     * @method randomize
     * @param {Integer} _length Individual size
     * @param {Integer} _min Individual minimum size
     * @param {Integer} _max Individual maximum size
     * @return This individual
     */
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
    /**
     * Individual assessment
     * @method evaluate
     * @param {Integer} _fitFn
     * @return This fitness
     */
    evaluate: function(_fitFn) {
        this.setFitness(_fitFn(this.chromosome));
        return this;
    }
});
