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
        
        //console.log("Entro en operador cruce");
        //If the population type is not defined, a new population is returned
        if (typeof _auxPop == 'undefined') {
            return toRet;
        }

        //Preguntar a Victor. Esto es raro
        if (_auxPop.length() <= 0) {
            toRet.add(_auxPop.getAt(0).copy());
            return toRet;
        }

		var rnd2 = jsEOUtils.intRandom(1, _auxPop.length() - 1);
		
        var tmpChr1 = _auxPop.getAt(0).getChromosome().slice();
		
		/* 
		*  Aqui "parcheamos" un poco la solucion a elegir, dado que inesperadamente y sin un porque
		*  hay soluciones en el problema de las NReinas que se guardan vacias. Por tanto, hacemos un bucle
		*  que se encargue de encontrar una que no este vacia para poder hacer el cruce correctamente
		*/ 
		
		/*while(typeof _auxPop.getAt(rnd2) == 'undefined'){
			rnd2 = jsEOUtils.intRandom(1, _auxPop.length() - 1);
		}
		*/
		
        var tmpChr2 = _auxPop.getAt(rnd2).getChromosome().slice();
        var newChr = [];
        var orderChr = [];
        var auxChr = [];
        
        var point = jsEOUtils.intRandom(1, (tmpChr1.length - 2));

        //Creacion del primer hijo
        //Rellenamos la primera parte
        for(var i = 0; i < point; ++i)
            newChr.push(tmpChr1[i]);
        
        for(var j = 0; j < tmpChr2.length; ++j)
            orderChr.push(tmpChr2[j]);
        
        for(var n = 0; n < newChr.length; ++n){
            var index = jsEOUtils.exists(newChr, orderChr);
            if(index != -1)
                orderChr.splice(index, 1);
        }
        
        
        var m = 0;
        while(newChr.length < tmpChr1.length){
            newChr.push(orderChr[m]);
            ++m;
        }
    

        jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr);
        toRet.add(new jsEOPIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

