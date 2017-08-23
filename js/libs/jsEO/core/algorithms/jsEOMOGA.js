/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOMOGA = new Class({
    Extends: jsEOAlgorithm,
    indivSelector: null,
    operSelector: null,
    population: null,
    numberObjectives: 0,
    initialize: function (_opSend, _opGet, _numberObjectives) {
        this.parent(_opSend, _opGet);
        jsEOUtils.debugln("Initializing a jsEOGA" +
                " with this.population " + this.population +
                ", selector of individuals " + this.indivSelector +
                ", selector of operators " + this.operSelector
                );
        this.numberObjectives = _numberObjectives;
    },
    setPopulation: function (_pop) {
        this.population = _pop;
        return this;
    },
    setOperSelector: function (_op) {
        this.operSelector = _op;
        return this;
    },
    setIndividSelector: function (_op) {
        this.indivSelector = _op;
        return this;
    },
    getPopulation: function ( ) {
        return this.population;
    },
    getOperSelector: function ( ) {
        return this.operSelector;
    },
    getIndividSelector: function ( ) {
        return this.indivSelector;
    },
    privateRun: function (_fitFn, _fitFnParams, _numGenerations) {


        console.log("Entro en el algoritmo");
        var popSize = this.population.length();
        this.population.sort();

        var sorting = new jsEOMOOpSortingND();
        var crowding = new jsEOMOCrowdingDistance();
        var childrenPop = new jsEOPopulation();
        var auxPop = new jsEOPopulation();

        var newPop = new jsEOPopulation();

        var bestFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5)) + 1;
        var averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));

        //Ejecutamos tantas veces el algoritmo como numero de generaciones queramos
        for (var j = 0; (j < _numGenerations); ++j) {

            //Creamos una poblacion en la que incluiremos los hijos y los padres
            //La primera generacion solo estaran los padres
            auxPop.join(this.population);
            auxPop.join(childrenPop);

            //console.log("Poblacion padres e hijos", auxPop);
            //Calculamos los frentes a partir del ordenamiento no dominado
            var fronts = sorting.operate(auxPop);

            //console.log("Frentes", fronts);
            //Una vez calculados los frentes, vamos añadiendolos a la nueva poblacion
            var n = 0;
            //En este bucle mientras que no se supere el tamaño de la poblacion se va añadiendo
            //a la nueva poblacion los frentes directamente
            //Estos primero se ordenan por la distancia de Crowding
            while (newPop.length() + fronts[n].length <= popSize) {
                if (newPop.length() == popSize)
                    break;
                crowding.operate(fronts[n], this.numberObjectives);
                var _aPop = new jsEOPopulation();
                _aPop.setPopulation(fronts[n]);
                //console.log("poblacion con frente", _aPop);
                newPop.join(_aPop);
                ++n;
            }

            //Una vez no nos caben mas frentes completos, hacemos un ordenamiento por crowding
            //Calculamos la distancia de crowding para el ultimo frente parcial
            if (newPop.length() < popSize) {

                crowding.operate(fronts[n], this.numberObjectives);
                this.sortCrowding(fronts[n]);

                //Este nos dejara la poblacion ordenada en funcion de dicha distancia
                var frontPopulation = new jsEOPopulation();
                frontPopulation.setPopulation(fronts[n]);

                //Y solo cogeremos todos aquellos que quepan en la nueva poblacion
                frontPopulation.crop(popSize - newPop.length());

                //Los añadimos a la nueva poblacion
                newPop.join(frontPopulation);
            }

            //console.log("poblacion con los frentes", newPop);

            //Hacemos los cruces y mutaciones correspondientes despues de hacer la seleccion
            //Aqui obtenemos los hijos despues de la seleccion y aplicamos el cruce y la mutacion
            var childrenPop = this.indivSelector.operate(this.population);
            //console.log("Poblacion de hijos", childrenPop);
            for (var i = 0; i < childrenPop.length(); ++i) {
                var tmpPop = new jsEOPopulation();
                tmpPop.add(childrenPop.getAt(i)).join(childrenPop);
                tmpPop = this.operSelector.
                        operate().
                        operate(tmpPop).
                        evaluate(_fitFn, _fitFnParams);
                childrenPop.setAt(i, tmpPop.getAt(0));
            }

            //Una vez hemos obtenido los hijos, sustituimos la poblacion que teniamos al principio
            //por la nueva poblacion sin añadir a los hijos
            this.population.setPopulation(newPop.crop(popSize).getPopulation());
            
            this.population.sortMO(this.population.getPopulation());
            //console.log("Poblacion al terminar la generacion", this.population);

            newPop = new jsEOPopulation();

            if (typeof this.opSend != 'undefined' && this.opSend != null) {
                this.opSend.operate(this.population);
            }

            if (typeof this.opGet != 'undefined' && this.opGet != null) {
                this.opGet.operate(this.population);
            }

//            bestFit = parseFloat(this.population.getAt(0).getFitness().toFixed(5));
//            averFit = parseFloat(jsEOUtils.averageFitness(this.population).toFixed(5));
//
//            jsEOUtils.recordStats(this.population.getLast().getFitness(),
//                    jsEOUtils.averageFitness(this.population),
//                    this.population.getAt(0).getFitness());

            auxPop = new jsEOPopulation();

        } //for numGenerations
    },
    run: function (_fitFn, _fitFnParams, _numGenerations) {
        this.privateRun(_fitFn, _fitFnParams, _numGenerations);
    },
    sortCrowding: function (_aPop) {

        //Este metodo es el que se encarga de ordernar los individuos de un frente
        //cuando este no cabe entero en la nueva poblacion y solo podemos coger unos pocos
        var ind1 = 0, ind2 = 0;
        for (var i = (_aPop.length - 1); i > -1; --i) {
            for (var j = 1; j < (i + 1); ++j) {
                ind1 = _aPop[j - 1];
                ind2 = _aPop[j];

                if (ind1.crowdedComparison(ind2) < 0) {
                    _aPop[j - 1] = ind2;
                    _aPop[j] = ind1;
                }
            }
        }
        return this;
    }
});