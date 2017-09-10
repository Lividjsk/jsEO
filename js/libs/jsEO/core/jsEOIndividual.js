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
* jsEO Individual
*
* @class jsEOIndividual
*/
var jsEOIndividual = new Class({
    Extends: jsEO
	/**
	* Chromosome
	* @property chromosome
	* @type {Various}
	* @default null
	*/
    , chromosome: null, 
	/**
     * Initialization of the individual
     * @method initialize
     * @param {Various} _chromosome
     * @return null
     */
	 initialize: function (_chromosome) {
        this.parent();
        this.chromosome = _chromosome || null;
        jsEOUtils.debug("Initialising a jsEOIndividual with chromosome " + this.chromosome +
                "<br/>");

    }
    , 
	/**
	  * Copy the chromosome
	  * @method copy
	  * @return toRet
	  */
	 copy: function () {
        var toRet = new jsEOIndividual();
        toRet.fitness = (this.fitness.copy) ? this.fitness.copy() : this.fitness;
        toRet.chromosome = (this.chromosome.copy) ? this.chromosome.copy() : this.chromosome;
        return toRet;
    }
    , 
	/**
	  * Method get for the chromosome
	  * @method getChromosome
	  * @return This chromosome
	  */
	 getChromosome: function () {
        return this.chromosome;
    }
    , 
	/**
	  * Method set for the chromosome
	  * @method setChromosome
	  * @param {Various} _chromosome
	  * @return This chromosome modify
	  */
	 setChromosome: function (_chromosome) {
        this.chromosome = _chromosome;
        return this;
    }
    , 
	/**
	  * Individual assessment
	  * @method evaluate
	  * @param {Integer} _fitFn
	  * @param {Array} _params
	  * @return This fitness
	  */
	 evaluate: function (_fitFn, _params) {
        this.setFitness(_fitFn(this.chromosome, _params));
        return this;
    }
});

