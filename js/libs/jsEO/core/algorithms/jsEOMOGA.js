/* 
 * Copyright (C) 2013 vrivas
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
* Algorithm Genetic
*
* @class jsEOMOGA
*/
var jsEOMOGA = new Class({
    Extends: jsEOAlgorithm,
    indivSelector: null,
    operSelector: null,
    population: null,
    numberObjectives: 0,
    /**
     * Initialization of the algorithm
     * @method initialize
     * @param {jsEOOperator} _opSend
     * @param {jsEOOperator} _opGet
	 * @param {Integer} _numberObjectives
     * @return This algorithm
     */
    initialize: function (_opSend, _opGet, _numberObjectives) {
        this.parent(_opSend, _opGet);
        jsEOUtils.debugln("Initializing a jsEOGA" +
                " with this.population " + this.population +
                ", selector of individuals " + this.indivSelector +
                ", selector of operators " + this.operSelector
                );
        this.numberObjectives = _numberObjectives;
    },
    /**
     * Method set for the population
     * @method setPopulation
     * @param {jsEOPopulation} _pop
     * @return This population
     */
    setPopulation: function(_pop) {
        this.population = _pop;
        return this;
    },
    /**
     * Method set for the individual operator
     * @method setOperSelector
     * @param {jsEOOperator} _op
     * @return This individual operator
     */
    setOperSelector: function(_op) {
        this.operSelector = _op;
        return this;
    },
    /**
     * Method set for the individual selector
     * @method setIndividSelector
     * @param {jsEOOperator} _op
     * @return This individual selector
     */
    setIndividSelector: function(_op) {
        this.indivSelector = _op;
        return this;
    },
    /**
     * Method get for the population
     * @method getPopulation
     * @return This population
     */
    getPopulation: function( ) {
        return this.population;
    },
    /**
     * Method get for the individual operator
     * @method getOperSelector
     * @return This individual operator
     */
    getOperSelector: function( ) {
        return this.operSelector;
    },
    /**
     * Method get for the individual selector
     * @method getIndividSelector
     * @return This individual Selector
     */
    getIndividSelector: function( ) {
        return this.indivSelector;
    },
    /**
     * Algorithm
     * @method privateRun
     * @param {Integer} _fitFn
     * @param {Array} _fitFnParams
     * @param {Integer} _numGenerations
     * @return null
     */
    privateRun: function (_fitFn, _fitFnParams, _numGenerations) {

        var popSize = this.population.length();
        this.population.sort();

        var sorting = new jsEOMOOpSortingND();
        var crowding = new jsEOMOCrowdingDistance();
        var childrenPop = new jsEOPopulation();
        var auxPop = new jsEOPopulation();

        var newPop = new jsEOPopulation();

        var bestFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5)) + 1;
        var averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));

        //We execute as many times the algorithm as number of generations ago
        for (var j = 0; (j < _numGenerations); ++j) {

            //We create a population in which we will include children and parents.
			//The first generation will only be parents
            auxPop.join(this.population);
            auxPop.join(childrenPop);

            //We calculate the fronts from the non-dominated ordering
            var fronts = sorting.operate(auxPop);

            //Once the fronts have been calculated, we will add them to the new population
            var n = 0;
			
            //In this loop as long as the size of the population is not exceeded,
			//the fronts are added to the new population.
			//These are first sorted by the distance of Crowding
            while (newPop.length() + fronts[n].length <= popSize) {
                if (newPop.length() == popSize)
                    break;
                crowding.operate(fronts[n], this.numberObjectives);
                var _aPop = new jsEOPopulation();
                _aPop.setPopulation(fronts[n]);
                newPop.join(_aPop);
                ++n;
            }

            //Once we do not fit more complete fronts, we do a crowding order.
			//We calculate the crowding distance for the last partial front
            if (newPop.length() < popSize) {

                crowding.operate(fronts[n], this.numberObjectives);
                this.sortCrowding(fronts[n]);

                //This will leave us the population ordered in function of said distance
                var frontPopulation = new jsEOPopulation();
                frontPopulation.setPopulation(fronts[n]);

                //And we will only catch all those who fit in the new population
                frontPopulation.crop(popSize - newPop.length());

                //We add them to the new population
                newPop.join(frontPopulation);
            }

            //We make the corresponding crosses and mutations after making the selection.
			//Here we get the children after the selection and apply the crossing and the mutation
            var childrenPop = this.indivSelector.operate(this.population);
            for (var i = 0; i < childrenPop.length(); ++i) {
                var tmpPop = new jsEOPopulation();
                tmpPop.add(childrenPop.getAt(i)).join(childrenPop);
                tmpPop = this.operSelector.
                        operate().
                        operate(tmpPop).
                        evaluate(_fitFn, _fitFnParams);
                childrenPop.setAt(i, tmpPop.getAt(0));
            }

            //Once we have obtained the children, we replace the population
			//that we had at the beginning by the new population without adding to the children
            this.population.setPopulation(newPop.crop(popSize).getPopulation());
            
            this.population.sortMO(this.population.getPopulation());

            newPop = new jsEOPopulation();

            if (typeof this.opSend != 'undefined' && this.opSend != null) {
                this.opSend.operate(this.population);
            }

            auxPop = new jsEOPopulation();

        } //for numGenerations
    },
    /**
     * Method executing the algorithm
     * @method run
     * @param {Integer} _fitFn Fitnes
     * @param {Array} _fitFnParams
     * @param {Integer} _numGenerations
     * @return null
     */
    run: function (_fitFn, _fitFnParams, _numGenerations) {
        this.privateRun(_fitFn, _fitFnParams, _numGenerations);
    },
    /**
     * Ordering by  distance of crowding
     * @method sortCrowding
     * @param {jsEOPopulation} _aPop
     * @return This
     */
    sortCrowding: function (_aPop) {

        //This method is the one in charge of ordering the individuals of a front
		//when this does not fit whole in the new population and we can only catch a few
        var ind1 = 0, ind2 = 0;
        for (var i = (_aPop.length - 1); i > -1; --i) {
            for (var j = 1; j < (i + 1); ++j) {
                ind1 = _aPop[j - 1];
                ind2 = _aPop[j];

                if (ind1.crowdedComparison(ind2) < 0) {
                    _aPop[j - 1] = ind2;
                    _aPop[j] = ind1;
                }
            }
        }
        return this;
    }
});