/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jsEOMOCrowdingDistance = new Class({
    Extends: jsEOOperator,
    initialize: function (_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " +
                "applicationRate " + this.applicationRate);
    },
    operate: function (_aFront, _numberObjectives) {

        //Este metodo lo que hace es en funcion del numero de objetivos a satisfacer
        //va calculando la distancia de cada individuo del frente que se le pasa
        //en funcion de los individuos que estan a su izquierda y a su derecha
        //Finalmente devuelve el frente con los individuos pero ya estos con su distancia
        if(_aFront.length == 0)
            return _aFront;
        
        for (var i = 0; i < _numberObjectives; ++i) {
            this.sortMO(_aFront, i);
            _aFront[0].crowding = 9999999;
            _aFront[(_aFront.length - 1)].crowding = 9999999;
            for (var j = 1; j < _aFront.length - 1; ++j) {
                _aFront[j].crowding += (_aFront[j + 1].matrixObjectives[i] - _aFront[j - 1].matrixObjectives[i]);
            }
        }
        return _aFront;
    }
    , sortMO: function (_aPop, obj_index) {

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
});
