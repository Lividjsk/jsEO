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
* Mutation Operator for Representation Order Individuals
*
* @class jsEOROOpMutation
*/
var jsEOROOpMutation = new Class({
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
    initialize: function (_applicationRate, _genesRate, _min, _max) {
        this.parent(_applicationRate);
        this.genesRate = _genesRate;
        this.min = _min;
        this.max = _max;
        jsEOUtils.debugln("Initializing a jsEOROMutation " +
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
    operate: function (_auxPop) {
        jsEOUtils.debugln("Applying jsEOROOpMutation");
		
		//Exchange Mutation
		
        var toRet = new jsEOPopulation();
        var gen_mutation = 0;
        var gen_mutation_2 = 0;
        var value = 0;
        var tmpChr = _auxPop.getAt(0).getChromosome();
        var newChr = [];

        for (var i = 0; i < tmpChr.length; ++i) {
            newChr.push(tmpChr[i]);
        }
		
		if(Math.random() < this.genesRate){
			gen_mutation = jsEOUtils.intRandom(1, tmpChr.length - 1);
			gen_mutation_2 = jsEOUtils.intRandom(1, tmpChr.length - 1);

			if (gen_mutation === gen_mutation_2) {
				do {
					gen_mutation_2 = jsEOUtils.intRandom(1, tmpChr.length - 1);
				} while (gen_mutation === gen_mutation_2);
			}

			jsEOUtils.debugln("  Individual is " + newChr);
			value = newChr[gen_mutation];
			newChr[gen_mutation] = newChr[gen_mutation_2];
			newChr[gen_mutation_2] = value;
			jsEOUtils.debugln("  Final  " + newChr);
		}

        toRet.add(new jsEOROIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});


