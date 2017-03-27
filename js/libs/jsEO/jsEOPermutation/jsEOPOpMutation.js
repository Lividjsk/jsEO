/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOPOpMutation = new Class({
    Extends: jsEOOperator,
    genesRate: null,
    min: null,
    max: null,
    initialize: function (_applicationRate, _genesRate, _min, _max) {
        this.parent(_applicationRate);
        this.genesRate = _genesRate;
        this.min = _min;
        this.max = _max;
        jsEOUtils.debugln("Initializing a jsEOPMutation " +
                " with applicationRate " + this.applicationRate +
                ", genesRate " + this.genesRate +
                ", min " + this.min +
                ", max " + this.max
                );

    },
    operate: function (_auxPop) {
        jsEOUtils.debugln("Applying jsEOPOpMutation");
        var toRet = new jsEOPopulation();
//        var number_mutation = jsEOUtils.intRandom(1, _auxPop.getAt(0).length - 1);
//        var gen_mutation = 0;
//        var gen_mutation_2 = 0;
//        var value = 0;
        var newChr;
        var individual = _auxPop.getAt(0).getChromosome();
        for (var geneIndex = 0; geneIndex < individual.length; ++geneIndex) {
            if (this.genesRate < Math.random()) {
                individual[geneIndex].setRandomly();
            }
        }   
        toRet.add((new jsEOPIndividual()));
        toRet.getAt(0).setChromosome(individual);
        return toRet;
    }
});


