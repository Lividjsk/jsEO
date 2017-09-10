/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
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
* Mutation Operator for FloatVector Individuals
*
* @class jsEOFVOpMutation
*/
var jsEOFVOpMutation = new Class({
    Extends: jsEOOperator,
    /**
	* Probability of mutation
	* @property genesRate
	* @type {Float}
	* @default null
	*/
    genesRate: null,
	/**
	* @property min
	* @type {Float}
	* @default null
	*/
    min: null,
	/**
	* @property max
	* @type {Float}
	* @default null
	*/
    max: null,
    /**
     * Description Initialization of the operator
     * @method initialize
     * @param {Float} _applicationRate Probability for operator application
     * @param {Float} _genesRate Probability of mutation
     * @param {Integer} _min Minimum possible value
     * @param {Integer} _max Maximum possible value
     * @return null
     */
    initialize: function(_applicationRate, _genesRate, _min, _max) {
        this.parent(_applicationRate);
        this.genesRate = _genesRate;
        this.min = _min;
        this.max = _max;
        jsEOUtils.debugln("Initializing a jsEOFVMutation " +
                " with applicationRate " + this.applicationRate +
                ", genesRate " + this.genesRate +
                ", min " + this.min +
                ", max " + this.max
                );

    },
    /**
     * Description Application of the operator
     * @method operate
     * @param {jsEOPopulation} _auxPop Population to mutate
     * @return toRet Population with the new individual (s)
     */
    operate: function(_auxPop) {
        jsEOUtils.debugln("Applying jsEOBSOpBitFlip");
        var toRet = new jsEOPopulation();
        var tmpChr = _auxPop.getAt(0).getChromosome();
        var newChr = [];
        jsEOUtils.debugln("  Individual is " + tmpChr);
        for (var i = 0; i < tmpChr.length; ++i) {
            newChr.push( (Math.random() < this.genesRate) ? (Math.random()*(this.max-this.min)+this.min) : tmpChr[i]);
        }
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOFVIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

