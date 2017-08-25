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

var jsEOMOIndividual = new Class({
	Extends: jsEO,
	matrixObjectives: [],
	crowding: 0,
	np: 0,
	sp: [],
	rank: 0,
	initialize: function(_chromosome) {
		this.parent(_chromosome); // calls initalize method of jsEOIndividual class
		jsEOUtils.debug("Initializating a jsEOMOIndividual ");

	},
	copy: function() {
		var toRet = new jsEOIndividual();
		toRet.matrixObjectives = (this.matrixObjectives.copy) ? this.matrixObjectives.copy() : this.matrixObjectives;
		toRet.chromosome = (this.chromosome.copy) ? this.chromosome.copy() : this.chromosome;
		return toRet;
	},
	getChromosome: function() {
		return this.chromosome;
	},
	setChromosome: function(_chromosome) {
		this.chromosome = _chromosome;
		return this;
	},
	dominated: function(_aIndividual) {

		//This method tells us if one individual is dominated by another.
		//The concept of domination is based on one individual being better than another.
		//If this is not of lower quality in any of its objectives or if it is better than the other in at least one of the objectives
		var dominates = false;

		for (var i = 0; i < this.matrixObjectives.length; ++i) {

			if (this.matrixObjectives[i] > _aIndividual.matrixObjectives[i]) return false;
			else if (this.matrixObjectives[i] < _aIndividual.matrixObjectives[i]) dominates = true;
		}
		return dominates;
	},
	crowdedComparison: function(_aInd2) {

		//This method compares 2 individuals based on their crowding distance.
		//It is used to know which individuals enter from the front when this does not fit whole
		if (this.crowding > _aInd2.crowding) return 1;
		else if (this.crowding < _aInd2.crowding) return -1;
		else return 0;
	},
	getCrowding: function() {
		return this.crowding;
	},
	setCrowding: function(_crowding) {
		this.crowding = _crowding;
		return this;
	},
	evaluate: function(_fitFn) {

		//This evaluation function does not only receive a fitness
		//but receives an array with fitness for each objective to satisfy
		var objectives = _fitFn(this.chromosome);

		for (var i = 0; i < objectives.length; ++i) {
			this.matrixObjectives.push(objectives[i]);
		}
		return this;
	},
	getFitnessAt: function(_i) {
		return this.matrixObjectives[_i];
	},
	setFitnessAt: function(_i, _fitness) {
		this.matrixObjectives[_i] = _fitness;
	},
	setObjectives: function(_objectives) {
		this.matrixObjectives = _objectives;
	},
	getObjectives: function() {
		return this.matrixObjectives;
	},
	getNp: function() {
		return this.np;
	},
	getSp: function() {
		return this.sp;
	},
	setNp: function(_np) {
		this.np = _np;
	},
	setSp: function(_sp) {
		this.np = _sp;
	},
	getRank: function() {
		return this.rank;
	},
	setRank: function(_rank) {
		this.rank = _rank;
	}
});