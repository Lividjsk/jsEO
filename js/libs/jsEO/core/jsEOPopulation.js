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
* jsEO Population
*
* @class jsEOPopulation
*/
var jsEOPopulation = new Class({
	/**
	* Array with the population
	* @property pop
	* @type {Array}
	* @default Empty
	*/
    pop: []
    , 
	/**
	  * Inicialization of the population
	  * @method initialize
	  * @return null
	  */
	 initialize: function ( ) {
        jsEOUtils.debug("Initialising a jsEOPopulation" +
                "<br/>");
    }
    , 
	/**
	  * Method get to population
	  * @method getPopulation
	  * @return This population
	  */
	 getPopulation: function () {
        return this.pop;
    }
    , 
	/**
	  * Method set to population
	  * @method setPopulation
	  * @param {Individuals} _indivs
	  * @return This population
	  */
	 setPopulation: function (_indivs) {
        this.pop = _indivs;
        return this;
    }
    , 
	 getAt: function (_i, _j) {
        if (typeof _i === 'undefined') {
            return null;
        }
        if (typeof _j === 'undefined') {
            return this.pop[_i]; // Returns and individual
        }
        return this.pop.slice(_i, _j + 1); // Returns an array        
    }
    // Alias of getAt
    , 
	/**
	  * Return individual at one position
	  * @method getIndividualAt
	  * @param {Integer} _i
	  * @return This individual at the position _i
	  */
	 getIndividualAt: function (_i) {
        return this.getAt(_i);
    }
    ,
	 getLast: function () {
        return this.pop[this.pop.length - 1];
    }
    // Alias of getLast
    , 
	/**
	  * Return the last individual of the opulation
	  * @method getLastIndividual
	  * @return This individual at the final position
	  */
	 getLastIndividual: function () {
        return this.getLast();
    }
    , 
 	setAt: function (_i, _indiv) {
        this.pop[_i] = _indiv;
        return this;
    }
    // Alias of setAt
    , 
	/**
	  * Modify one individual
	  * @method setIndividualAt
	  * @param {Integer} _i
	  * @param {Individual} _indiv
	  * @return This population
	  */
	 setIndividualAt: function (_i, _indiv) {
        return this.setAt(_i, _indiv);
    }
    , 
	 add: function (_indiv) {
        this.pop.push(_indiv);
        return this;
    }
    // alias of add
    , 
	/**
	  * Add an individual to population
	  * @method addIndividual
	  * @param {Individual} _indiv
	  * @return This population
	  */
	 addIndividual: function (_indiv) {
        return this.add(_indiv);
    }
    , 
	/**
	  * Return the length of the population
	  * @method length
	  * @return This population length
	  */
	 length: function () {
        return this.pop.length;
    }
    , 
	/**
	  * Order the population
	  * @method sort
	  * @return This population ordered
	  */
	 sort: function () {
        pop = this.pop.sort(function (a, b) {
            return (jsEOUtils.getMaximize() ? -1 : 1) * a.compare(b);
            ;
        });
        return this;
    }
    , 
	/**
	  * Cut out this population
	  * @method crop
	  * @param {Integer} _size
	  * @return This population modify
	  */
	 crop: function (_size) {
        if (typeof _size == 'undefined') {
            _size = this.pop.length;
        }
        if (_size < 0) {
            _size = 0;
        }
        this.pop = this.pop.slice(0, _size);
        return this;
    }
    , 
	/**
	  * Link tow populations
	  * @method join
	  * @param {jsEOPopulation} _aPop
	  * @return This population
	  */
	 join: function (_aPop) {
        this.pop = this.pop.concat(_aPop.pop);
        return this;
    }
    , 
	/**
	  * Replace population
	  * @method replace
	  * @param {Integer} _i
	  * @param {jsEOPopulation} _aPop
	  * @return This population
	  */
	 replace: function (_i, _aPop) {
        for (var j = 0; j < _aPop.pop.length; ++j) {
            this.pop[j + _i] = _aPop.pop[j];
        }
        return this;
    }
	, 
	/**
	  * Ordering population by fitness
	  * @method sortMO
	  * @param {Array} _aPop
	  * @param {Integer} obj_index
	  * @return This population
	  */
	 sortMO: function (_aPop, obj_index) {

        if(_aPop.length == 1)
            return this;
        
        var ind1 = 0, ind2 = 0;
		for (var i = (_aPop.length - 1); i > -1; --i) {
            for (var j = 1; j < (i + 1); ++j) {
                ind1 = _aPop[j - 1];
                ind2 = _aPop[j];

                if (ind1.getFitnessAt(obj_index) > ind2.getFitnessAt(obj_index)) {
                    _aPop[j - 1] = ind2;
                    _aPop[j] = ind1;
                }
            }
        }
        return this;
    }
    ,
	/**
     * Evaluates the individuals of the population, one after other
     * @param {Function} _aFunction The function to evaluate
     * @param {Array} _params Other parameters the function could need
     * @return This population evaluated
     */
 	evaluate: function (_aFunction, _params) {
        this.pop.forEach(function (e) {
            //console.log(e);
            e.evaluate(_aFunction, _params);
        });
        return this;
    }
});

