/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOPOpCrossOver = new Class({
    Extends: jsEOOperator,
    initialize: function (_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " +
                "applicationRate " + this.applicationRate);
    },
    operate: function (_auxPop) {
        jsEOUtils.debugln("Applying jsEOROOpCrossOver");
        var toRet = new jsEOPopulation();
        //If the population type is not defined, a new population is returned
        if (typeof _auxPop == 'undefined') {
            return toRet;
        }

        //Preguntar a Victor. Esto es raro
        if (_auxPop.length() <= 0) {
            toRet.add(_auxPop.getAt(0).copy());
            return toRet;
        }

        var tmpChr1 = _auxPop.getAt(0).getChromosome().slice();
        var tmpChr2 = _auxPop.getAt(1).getChromosome().slice();
        var newChr1 = new Array(tmpChr1.length);

        //Creacion del primer hijo
        //Rellenamos la primera parte
        for ( var i = 0; i < tmpChr1.length/2; ++i){
            newChr1[i]=tmpChr1[i];
        }
        
        for(var j = (tmpChr1.length/2); j <tmpChr1.length; ++j){
            newChr1[j]=tmpChr2[j];
        }
        
        jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr1);
        toRet.add(new jsEOPIndividual());
        toRet.getAt(0).setChromosome(newChr1);
        //Creación del segundo hijo
        var newChr2 = new Array(tmpChr1.length);

        for ( var i = 0; i < tmpChr1.length/2; ++i){
            newChr2[i]=tmpChr2[i];
        }
        
        for(var j = (tmpChr1.length/2); j < tmpChr1.length; ++j){
            newChr2[j]=tmpChr1[j];
        }

        jsEOUtils.debugln("  Inicio es " + tmpChr2 + " Final  " + newChr2);
        toRet.add(new jsEOPIndividual());
        toRet.getAt(1).setChromosome(newChr2);
        return toRet;
    }
});

