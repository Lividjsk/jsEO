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
* Algorithm for Web Block
*
* @class jsEOWBGA
*/
var jsEOWBGA = new Class({
    Extends: jsEOGA,
    /**
	* Parameter to view debugging
	* @property verbose
	* @type {Boolean}
	* @default false
	*/
    verbose: jsEOUtils.getInputParam("verbose", false),
	/**
	* Parameter to view the configuration
	* @property configure
	* @type {Boolean}
	* @default false
	*/
    configure: jsEOUtils.getInputParam("configure", false),
	/**
	* Individual size
	* @property popSize
	* @type {Integer}
	* @default 100
	*/
    popSize: jsEOUtils.getInputParam("popSize", 50),
	/**
	* Tournament Size
	* @property tournament Size
	* @type {Integer}
	* @default 2
	*/
    tournamentSize: jsEOUtils.getInputParam("tournamentSize", 2),
	/**
	* Application Rate for cross-over
	* @property xOverRate
	* @type {Float}
	* @default 0.8
	*/
    xOverRate: jsEOUtils.getInputParam("xOverRate", 0.8),
	/**
	* Application Rate for mutation
	* @property mutRate
	* @type {Float}
	* @default 0.2
	*/
    mutRate: jsEOUtils.getInputParam("mutRate", 0.2),
	/**
	* Mutation power
	* @property mutPower
	* @type {Float}
	* @default 0.5
	*/
    mutPower: jsEOUtils.getInputParam("mutPower", 0.5),
	/**
	* Number of generations
	* @property numGenerations
	* @type {Integer}
	* @default 500
	*/
    numGenerations: jsEOUtils.getInputParam("numGenerations", 100),
	/**
	* Replace Rate
	* @property replaceRate
	* @type {Float}
	* @default 0.5
	*/
    replaceRate: jsEOUtils.getInputParam("replaceRate", 0.5),
	/**
	* Individuals Rate
	* @property getIndividualsRate
	* @type {Float}
	* @default 0.2
	*/
    getIndividualsRate: jsEOUtils.getInputParam("getIndividualsRate",  0.2),
	/**
	* Number of individuals displayed
	* @property showing
	* @type {Integer}
	* @default 3
	*/
    showing: jsEOUtils.getInputParam("showing", 3),
	/**
	* Individual Size
	* @property indSize
	* @type {Integer}
	* @default 2
	*/
    indSize: jsEOUtils.getInputParam("indSize", 256),
    /**
     * Initialization of the algorithm
     * @method initialize
     * @param {jsEOOperator} _opSend
     * @param {jsEOOperator} _opGet
     * @return This algorithm
     */
    initialize: function(_opSend, _opGet) {
        if( typeof _opGet != 'undefined' ) {
            _opGet.setApplicationRate( this.getIndividualsRate );
        }
        this.parent(_opSend, _opGet);
        jsEOUtils.debugln("Initializing a jsEOWBGA ");

    },
    /**
     * Method for view the configure
     * @method doConfigure
     * @return This configure
     */
    doConfigure: function() {
        var msg = "";
        jsEOUtils.setOutput("jsEOForm");
        jsEOUtils.println("<strong>Configuring EOTest</strong><br/>");
        msg = "<form method='GET' action='./index.html' name='f1'>";
        msg += "<p>Verbosity: <input type='radio' name='verbose' value='true'>True ";
        msg += "<input type='radio' name='verbose' value='False'>False</p>";
        msg += "<p>Individual size: <input type='text' name='indSize' value='" +
                this.indSize + "' size='4'></p>";
        msg += "<p>Population size: <input type='text' name='popSize' value='" +
                this.popSize + "' size='4'></p>";
        msg += "<p>Tournament size: <input type='text' name='tournamentSize' value='" +
                this.tournamentSize + "' size='4'></p>";
        msg += "<p>CrossOver rate: <input type='text' name='xOverRate' value='" +
                this.xOverRate + "' size='4'></p>";
        msg += "<p>Mutation rate: <input type='text' name='mutRate' value='" +
                this.mutRate + "' size='4'></p>";
        msg += "<p>Bits changed by mutator rate: <input type='text' name='mutPower' value='" +
                this.mutPower + "' size='4'></p>";
        msg += "<p>Number of generations: <input type='text' name='numGenerations' value='" +
                this.numGenerations + "' size='4'></p>";
        msg += "<p>Replace rate: <input type='text' name='replaceRate' value='" +
                this.replaceRate + "' size='4'></p>";
        msg += "<p>'Get Individuals' rate: <input type='text' name='getIndividualsRate' value='" +
                this.getIndividualsRate + "' size='4'></p>";
        msg += "<p>Number of individuals to show: <input type='text' name='showing' value='" +
                this.showing + "' size='4'></p>";
        msg += "<p><input type='submit' value='Send data'>" +
                "<input type='reset' value='Reset'></p>";
        msg += "</form>"
        jsEOUtils.clear();
        jsEOUtils.println(msg);
        jsEOUtils.setOutput("jsEOConsole");
    },
    /**
     * Method executing the algorithm
     * @method run
     * @param {Integer} _fitFn
     * @return null
     */
    run: function(_fitFn) {
        // Program
        if (this.configure) {
            this.doConfigure();
            return;
        }
        this.population = new jsEOPopulation();
        for (var i = 0; i < this.popSize; ++i) {
            var myWB = new jsEOWBIndividual();
            myWB.randomize(this.indSize).
                    evaluate(_fitFn);
            this.population.addIndividual(myWB);
        }
        this.population.sort();

        this.indivSelector = new jsEOOpSelectorTournament(this.tournamentSize,
                Math.floor(this.popSize * this.replaceRate));

        this.operSelector = new jsEOOperatorsWheel();
        this.operSelector.
                addOperator(new jsEOWBOpMutation(this.mutRate,
                        this.mutPower));
        if( this.opGet ) {
            this.operSelector.addOperator(this.opGet);
        }

        jsEOUtils.showPop(this.population, "Initial population", this.showing);
        jsEOUtils.println("Average fitness: " + jsEOUtils.averageFitness(this.population));

        this.privateRun(_fitFn, this.numGenerations, this.showing);

        jsEOUtils.showPop(this.population, "Final population", this.showing);
        jsEOUtils.println("Average fitness: " + jsEOUtils.averageFitness(this.population));
        //jsEOUtils.drawStats();
    }

});
 