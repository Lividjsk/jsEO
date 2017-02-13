/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOROOpCrossOver = new Class({
    Extends: jsEOOperator,
    initialize: function(_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " +
                "applicationRate " + this.applicationRate);

    },
    operate: function(_auxPop, tamSecuency) {
        jsEOUtils.debugln("Applying jsEOROOpCrossOver");
        var toRet = new jsEOPopulation();
        
        //If the population type is not defined, a new population is returned
        if (typeof _auxPop === 'undefined') {
            return toRet;
        }
        
        //Preguntar a Victor. Esto es raro
        if (_auxPop.length() <= 0) {
            toRet.add(_auxPop.getAt(0).copy());
            return toRet;
        }

        var individual1 = Math.floor(Math.random() * (_auxPop.length() - 1)) + 1;
        var individual2 = Math.floor(Math.random() * (_auxPop.length() - 1)) + 1;
        jsEOUtils.debugln("  rnd2 is " + individual1 +
                " while length is " + _auxPop.length() +
                " and " + typeof _auxPop.pop[0]);

        var tmpChr1 = _auxPop.getAt(individual1).getChromosome();
        var tmpChr2 = _auxPop.getAt(individual2).getChromosome();
        var point1 = Math.floor(Math.random() * (tmpChr1.length - 1));
        //var point2 = point1 + tamSecuency;

        jsEOUtils.debugln("  Individuals are " + tmpChr1 + " and " + tmpChr2);
        jsEOUtils.debugln("  Cut Point is " + point1);

        var newChr = new Array(tmpChr1.length);
        var auxChr = new Array();
        var orderChr = tmpChr2;
        
        //Comentarios en español para luego cambiarlos
        //Se copia la subsecuencia del primer padre en un individuo auxiliar
        for (var i = 0; i < tamSecuency-1; ++i){
            auxChr.push(tmpChr1[point1 + i]);
        }
        
        //Una vez copiada la subsecuencia, se miran los elementos que se han copiado
        //Y se copian en el orden corresponidente y mas parecido al del padre
        var auxIndex = 0;
        var esta = false;
        for (var i = 0; i < auxChr.length; ++i){
            var index = orderChr.indexOf(auxChr[i]);
            if( index != -1){
                orderChr.splice(index,1);
            }
        }            
        
        //Una vez obtenido el orden, rellenamos el hijo
        //Para ello insertamos la subsecuencia del padre, y luego el resto en el orden acordado
        for (var i = 0; i < tamSecuency-1; ++i){
            newChr[point1 + i] = auxChr[i];
        }
        
        //Colocamos detras de la subsecuencia
        for (var j = point1 + tamSecuency; j < tmpChr1.length; ++j){
            if (typeof newChr[j] === 'undefined'){
                newChr[j] = orderChr[0];
                orderChr.shift();
            }
        }
        
        //Colocamos antes de la subsecuencia
        for (var j = 0; j < point1; ++j){
            if (typeof newChr[j] === 'undefined'){
                newChr[j] = orderChr[0];
                orderChr.shift();
            }
        }

        jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr);
        toRet.add(new jsEOROIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

