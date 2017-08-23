/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jsEOMOIndividual = new Class({
    Extends: jsEO,
    matrixObjectives: [],
    crowding: 0,
    np: 0,
    sp: [],
    rank: 0,
    initialize: function (_chromosome) {
        this.parent(_chromosome); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOMOIndividual ");

    }
	, copy: function () {
        var toRet = new jsEOIndividual();
        toRet.matrixObjectives = (this.matrixObjectives.copy) ? this.matrixObjectives.copy() : this.matrixObjectives;
        toRet.chromosome = (this.chromosome.copy) ? this.chromosome.copy() : this.chromosome;
        return toRet;
    }
    , getChromosome: function () {
        return this.chromosome;
    }
    , setChromosome: function (_chromosome) {
        this.chromosome = _chromosome;
        return this;
    }
    , dominated: function (_aIndividual) {

        //Este metodo nos indica si un individuo es dominado por otro
        //El concepto de dominacia se basa en que un individuo es mejor que otro
        //Si este no es de menor calidad en ninguno de sus objetivos
        //O si es mejor que el otro en al menos uno de los objetivos
        var dominates = false;

        for (var i = 0; i < this.matrixObjectives.length; ++i) {
            
            if(this.matrixObjectives[i] > _aIndividual.matrixObjectives[i])
                return false;
            else if (this.matrixObjectives[i] < _aIndividual.matrixObjectives[i])
                dominates = true;
        }
        return dominates;
    }
    , crowdedComparison: function (_aInd2) {

        //Este metodo compara 2 individuos en funcion de su distancia de crowding
        //Se utiliza para saber que individuos entran del frente cuando este no cabe entero
        if (this.crowding > _aInd2.crowding)
            return 1;
        else if (this.crowding < _aInd2.crowding)
            return -1;
        else
            return 0;
    }
    , getCrowding: function () {
        return this.crowding;
    }
    , setCrowding: function (_crowding) {
        this.crowding = _crowding;
        return this;
    }
    , evaluate: function (_fitFn) {

        //Esta funcion de evaluar no recibe solo un fitness
        //Sino que recibe un array con el fitness para cada objetivo a satisfacer
        var objectives = _fitFn(this.chromosome);

        for (var i = 0; i < objectives.length; ++i) {
            this.matrixObjectives.push(objectives[i]);
        }
        return this;
    }
    , getFitnessAt: function (_i) {
        return this.matrixObjectives[_i];
    }
	, setFitnessAt: function(_i, _fitness){
		this.matrixObjectives[_i] = _fitness;
	}
	, setObjectives: function(_objectives){
		this.matrixObjectives = _objectives;
	}
	, getObjectives: function(){
		return this.matrixObjectives;
	}
	, getNp: function(){
		return this.np;
	}
	, getSp: function(){
		return this.sp;
	}
	, setNp: function(_np){
		this.np = _np;
	}
	, setSp: function(_sp){
		this.np = _sp;
	}
	, getRank: function(){
		return this.rank;
	}
	, setRank: function(_rank){
		this.rank = _rank;
	}
});
