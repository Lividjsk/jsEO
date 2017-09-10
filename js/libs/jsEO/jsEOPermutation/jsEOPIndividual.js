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


/**
* Individual for Permutations
*
* @class jsEOPIndividual
*/
var jsEOPIndividual = new Class({
    Extends: jsEOIndividual,
    /**
     * Initialization of the individual
     * @method initialize
     * @param {Array} _floats
     * @return null
     */
    initialize: function (_positions) {
        this.parent(_positions); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOROIndividual ");
    }
    , 
	/**
     * Creating an individual randomly
     * @method randomize
     * @param {Integer} _length Individual size
     * @param {Integer} _min Individual minimum size
     * @param {Integer} _max Individual maximum size
     * @return This individual
     */
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

        var chr = new Array(_length);
        var used = new Array();
        
        for(var n = 0; n < _length; ++n){
            for ( var m = 0; m < _length; ++m){
                used.push(new jsEOPosition(n,m));
            }
        }
        
        for (var i = 0; i < _length; ++i) {
            var random = jsEOUtils.intRandom(0, used.length - 1);
            chr[i] = used[random];
            used.splice(random,1);
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
    evaluate: function (_fitFn) {
        this.setFitness(_fitFn(this.chromosome));
        return this;
    }
    , 
	/**
	  * Method to know if a position already exists
	  * @method contains
	  * @param {jsEOPosition} _position
	  * @return Boolean True if it exists and false but
	  */
	 contains: function (_position) {
        for (var i = 0; i < this.chromosome.length; ++i) {
            if (this.chromosome[i].eq(position)) {
                return true;
            }
        }
        return false;
    }
    , 
	/**
	  * Show the solution in JSON format
	  * @method show
	  * @return cadena Solution in JSON format
	  */
	 show: function(){
        var chr = this.chromosome;
        var cadena = "";
        for(var j = 0; j < chr.length; ++j){
            if(j != chr.length - 1)
                cadena += chr[j].getPosition() +","; 
            else
                cadena += chr[j].getPosition();
        }
        return cadena;
    }
});

