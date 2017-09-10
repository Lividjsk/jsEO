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
* Algorithm Genetic
*
* @class jsEOGA
*/
var jsEOGA = new Class({
    Extends: jsEOAlgorithm,
    indivSelector: null,
    operSelector: null,
    population: null,
    /**
     * Initialization of the algorithm
     * @method initialize
     * @param {jsEOOperator} _opSend
     * @param {jsEOOperator} _opGet
     * @return This algorithm
     */
    initialize: function(_opSend, _opGet) {
        this.parent(_opSend, _opGet);
        jsEOUtils.debugln("Initializing a jsEOGA" +
                " with this.population " + this.population +
                ", selector of individuals " + this.indivSelector +
                ", selector of operators " + this.operSelector
                );

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
    privateRun: function(_fitFn, _fitFnParams, _numGenerations) {
        var popSize = this.population.length();
        this.population.sort();
        //jsEOUtils.h2("Starting evolution");
        //jsEOUtils.print("Generation number: <span id='genNum'>0</span>");
        //jsEOUtils.print(" Best fitness: <span id='bestFit'>0</span>");
        //jsEOUtils.print(" Average fitness: <span id='aveFit'>" +
        //        jsEOUtils.averageFitness(this.population) + "</span>");
        var bestFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5)) + 1;
        var averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));
        for (var j = 0; (j < _numGenerations); ++j) {
            //jsEOUtils.replace(j, "genNum");
            //jsEOUtils.replace(bestFit, "bestFit");
            //jsEOUtils.replace(
            //        parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5)),
            //        "aveFit");

            var newPop = this.indivSelector.operate(this.population);
            for (var i = 0; i < newPop.length(); ++i) {
                var tmpPop = new jsEOPopulation();
                tmpPop.add(newPop.getAt(i)).join(newPop);
                tmpPop = this.operSelector.
                        operate().
                        operate(tmpPop).
                        evaluate(_fitFn, _fitFnParams);
                newPop.setAt(i, tmpPop.getAt(0));
            }
            this.population.join(newPop).sort().crop(popSize);
			
            if (typeof this.opSend != 'undefined' && this.opSend != null) {
                this.opSend.operate(this.population);
            }
			
            bestFit = parseFloat(this.population.getAt(0).getFitness().toFixed(5));
            averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));

            jsEOUtils.recordStats(this.population.getLast().getFitness(),
                    jsEOUtils.averageFitness(this.population),
                    this.population.getAt(0).getFitness());

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
    run: function(_fitFn, _fitFnParams, _numGenerations) {
        this.privateRun(_fitFn, _fitFnParams, _numGenerations);
    }
});

