/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOMOOpSortingND = new Class({
    Extends: jsEOOperator,
    initialize: function (_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " +
                "applicationRate " + this.applicationRate);
    },
    operate: function (_auxPop) {

        var frentes = new Array();


        frentes[0] = new Array();


        //Para cada individuo de la poblacion calculamos el frente al que pertenece
        for (var i = 0; i < _auxPop.length(); ++i) {
            _auxPop.getAt(i).sp = [];
            _auxPop.getAt(i).np = 0;
            for (var j = 0; j < _auxPop.length(); ++j) {
                if (i === j)
                    continue;
                //Crear este metodo. Devuelve true si el individuo i
                // es mejor que el individuo j
                //Si el individuo i es mejor que el j se mete en el conjunto
                //de individuos dominados por i
                if (_auxPop.getAt(i).dominated(_auxPop.getAt(j))) {
                    //console.log("introduzco");
                    _auxPop.getAt(i).sp.push(_auxPop.getAt(j));
                    //console.log("SP i", sp[i]);
                    //Sino, se incremente el nivel de dominancia del individuo i
                } else if (_auxPop.getAt(j).dominated(_auxPop.getAt(i))) {
                    _auxPop.getAt(i).np += 1;
                }
            }
            //Si el nivel de dominancia es 0, entonces va al primer frente
            if (_auxPop.getAt(i).np === 0){
                _auxPop.getAt(i).rank = 0;
                frentes[0].push(_auxPop.getAt(i));
            }


            //Una vez creado el primer frente, calculamos los demas
            var n = 0;

            //Mientras que el frente i no esta vacío
            while (frentes[n].length !== 0) {
                var Q = new Array();
                //Para cada individuo del frente
                for (var a = 0; a < frentes[n].length; ++a) {
                    var ind = frentes[n][a];
                    //Para cada invididuo del conjunto de dominados del individuo i
                    for (var b = 0; b < ind.sp.length; ++b) {
                        //Obtenemos su nivel de dominancia y le restamos 1
                        ind.sp[b].np -= 1;
                        //Si su nivel de dominancia es 0, va al conjunto Q
                        if (ind.sp[b].np === 0) {
                            ind.sp[b].rank = n + 1;
                            Q.push(ind.sp[b]);
                        }
                    }
                }
                //Finalmente, incrementamos el frente y se lo asignamos
                ++n;
                if(typeof frentes[n] != "undefined" && frentes[n] != null && frentes[n].length > 0){
                    for(var l = 0; l < Q.length; ++l)
                        frentes[n].push(Q[l]);
                }else
                    frentes[n] = Q;
            }
        }
        //Devuelve el vector con los frentes
        return frentes;
    }
});