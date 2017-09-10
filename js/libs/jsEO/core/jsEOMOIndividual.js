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
* jsEOMO Individual
*
* @class jsEOMOIndividual
*/
var jsEOMOIndividual = new Class({
    Extends: jsEO,
	/**
	* Matrix with the objectives
	* @property matrixObjectives
	* @type {Array}
	* @default Empty
	*/
    matrixObjectives: [],
	/**
	* Distance of crowding
	* @property crowding
	* @type {Integer}
	* @default 0
	*/
    crowding: 0,
	/**
	* Dominance Level
	* @property np
	* @type {Integer}
	* @default 0
	*/
    np: 0,
	/**
	* Individuals dominated
	* @property sp
	* @type {Array}
	* @default Empty
	*/
    sp: [],
	/**
	* Front of the individual
	* @property rank
	* @type {Integer}
	* @default 0
	*/
    rank: 0,
    /**
     * Initialization of the individual
     * @method initialize
     * @param {Various} _chromosome
     * @return null
     */
    initialize: function (_chromosome) {
        this.parent(_chromosome); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOMOIndividual ");

    }
	, 
	/**
	  * Copy the chromosome
	  * @method copy
	  * @return toRet
	  */
	 copy: function () {
        var toRet = new jsEOIndividual();
        toRet.matrixObjectives = (this.matrixObjectives.copy) ? this.matrixObjectives.copy() : this.matrixObjectives;
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
	  * Method to know if a individual is dominated for this
	  * @method dominated
	  * @param {jsEOMOIndividual} _aIndividual
	  * @return dominates
	  */
	 dominated: function (_aIndividual) {

        //This method tells us if one individual is dominated by another.
		//The concept of domination is based on one individual being better than another.
		//If this is not of lower quality in any of its objectives or if it is better than the other in at least one of the objectives
        var dominates = false;

        for (var i = 0; i < this.matrixObjectives.length; ++i) {
            
            if(this.matrixObjectives[i] > _aIndividual.matrixObjectives[i])
                return false;
            else if (this.matrixObjectives[i] < _aIndividual.matrixObjectives[i])
                dominates = true;
        }
        return dominates;
    }
    , 
	/**
	  * Comparison by distance of crowding
	  * @method crowdedComparison
	  * @param {jsEOMOIndividual} _aInd2
	  * @return toRet
	  */
	 crowdedComparison: function (_aInd2) {

		 var toRet = 0;
        //This method compares 2 individuals based on their crowding distance.
		//It is used to know which individuals enter from the front when this does not fit whole
        if (this.crowding > _aInd2.crowding)
            toRet = 1;
        else if (this.crowding < _aInd2.crowding)
            toRet = -1;
		 
		return toRet;
    }
    , 
	/**
	  * Method get for the distance of crowding
	  * @method getCrowding
	  * @return This distance of crowding
	  */
	 getCrowding: function () {
        return this.crowding;
    }
    , 
	/**
	  * Method set for distance of crowding
	  * @method setCrowding
	  * @param {Integer} _crowding
	  * @return This distance of crowding modify
	  */
	 setCrowding: function (_crowding) {
        this.crowding = _crowding;
        return this;
    }
    , 
	/**
	  * Individual assessment
	  * @method evaluate
	  * @param {Integer} _fitFn
	  * @return This fitness
	  */
 	evaluate: function (_fitFn) {

        //This evaluation function does not only receive a fitness
		//but receives an array with fitness for each objective to satisfy
        var objectives = _fitFn(this.chromosome);

        for (var i = 0; i < objectives.length; ++i) {
            this.matrixObjectives.push(objectives[i]);
        }
        return this;
    }
    , 
	/**
	  * Get fitness at one position
	  * @method getFitnessAt
	  * @param {Integer} _i
	  * @return This fitness at the position _i
	  */
	 getFitnessAt: function (_i) {
        return this.matrixObjectives[_i];
    }
	, 
	/**
	  * Set fitness at one position
	  * @method setFitnessAt
	  * @param {Integer} _i
	  * @param {Integer} _fitness
	  * @return null
	  */
	 setFitnessAt: function(_i, _fitness){
		this.matrixObjectives[_i] = _fitness;
	}
	, 
	/**
	  * Set objectives for the individual
	  * @method setObjectives
	  * @param {Array} _objectives
	  * @return null
	  */
	 setObjectives: function(_objectives){
		this.matrixObjectives = _objectives;
	}
	, 
	/**
	  * Get the objectives of the individual
	  * @method getObjectives
	  * @return This objectives of the individual
	  */
	 getObjectives: function(){
		return this.matrixObjectives;
	}
	, 
	/**
	  * Get the dominace level of the individual
	  * @method getNp
	  * @return This dominace level of the individual
	  */
	 getNp: function(){
		return this.np;
	}
	, 
	/**
	  * Get the individuals dominated by the individual
	  * @method getSp
	  * @return This individuals dominated by the individual
	  */
	 getSp: function(){
		return this.sp;
	}
	, 
	/**
	  * Set the dominance level of the individual
	  * @method setNp
	  * @param {Integer} _np
	  * @return null
	  */
	 setNp: function(_np){
		this.np = _np;
	}
	, 
	/**
	  * Set the individuals dominated by the individual
	  * @method setSp
	  * @param {Array} _sp
	  * @return null
	  */
	 setSp: function(_sp){
		this.np = _sp;
	}
	, 
	/**
	  * Get the front of the individual
	  * @method getRank
	  * @return This front of the individual
	  */
	 getRank: function(){
		return this.rank;
	}
	, 
	/**
	  * Set the front of the individual
	  * @method setRank
	  * @param {Integer} _rank
	  * @return null
	  */
	 setRank: function(_rank){
		this.rank = _rank;
	}
});
