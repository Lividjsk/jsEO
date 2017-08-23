/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOROOpCrossOver = new Class({
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
        //console.log("Poblacion Cruce", _auxPop);
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
		while(typeof _auxPop.getAt(rnd2) == 'undefined'){
			rnd2 = jsEOUtils.intRandom(1, _auxPop.length() - 1);
		}
		*/
		
        var tmpChr2 = _auxPop.getAt(rnd2).getChromosome().slice();

        var point1 = Math.floor(tmpChr1.length / 2);

        //Se selecciona el punto de corte, que ira desde la posicion 2 hasta
        //dicho punto, que sera siempre la mitad del tamaño

        jsEOUtils.debugln("  Individuals are " + tmpChr1 + " and " + tmpChr2);
        jsEOUtils.debugln("  Cut Point is " + point1);

        //console.log("individuo 1", tmpChr1);
        //console.log("individuo 2", tmpChr2);
        
        var newChr = [];
        var auxChr = [];
        var orderChr = tmpChr2.slice();

        //Comentarios en español para luego cambiarlos
        //Se copia la subsecuencia del primer padre en un individuo auxiliar
        for (var i = 1; i <= point1; ++i) {
            auxChr.push(tmpChr1[i]);
        }

        //console.log("Secuencia primer padre", auxChr);
        //Una vez copiada la subsecuencia, se miran los elementos que se han copiado
        //Y se copian en el orden corresponidente y mas parecido al del segundo padre
        for (var i = 0; i < auxChr.length; ++i) {
            var index = orderChr.indexOf(auxChr[i]);
            if (index != -1) {
                orderChr.splice(index, 1);
            }
        }
        orderChr.splice(0, 1);

        //console.log("Elementos del segundo padre que faltan por copiar", orderChr);
        
        newChr.push(0);

        for (var j = 0; j < auxChr.length; ++j) {
            newChr.push(auxChr[j]);
        }

        for (var n = 0; n < orderChr.length; ++n) {
            newChr.push(orderChr[n]);
        }


        //console.log("Cromosoma cruce final", newChr);
        
        jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr);
        toRet.add(new jsEOROIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

