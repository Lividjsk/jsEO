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
        var currentSon = 1;
        for (var i = 0; i < 2; ++i) {

            var newChr = new Array(tmpChr1.length);
            if (currentSon == 1) {
                newChr[0] = tmpChr1[0];
                newChr[1] = tmpChr1[1];
                newChr[2] = tmpChr2[2];
                newChr[3] = tmpChr2[3];
            } else {
                newChr[0] = tmpChr2[0];
                newChr[1] = tmpChr2[1];
                newChr[2] = tmpChr1[2];
                newChr[3] = tmpChr1[3];
            }
            currentSon++;

            jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr);
            toRet.add(new jsEOPIndividual());
            toRet.getAt(i).setChromosome(newChr);
        }
        return toRet;
    }
});

