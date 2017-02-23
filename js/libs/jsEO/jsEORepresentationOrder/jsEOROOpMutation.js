/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var jsEOROOpMutation = new Class({
    Extends: jsEOOperator,
    genesRate: null,
    min: null,
    max: null,
    initialize: function(_applicationRate, _genesRate, _min, _max) {
        this.parent(_applicationRate);
        this.genesRate = _genesRate;
        this.min = _min;
        this.max = _max;
        jsEOUtils.debugln("Initializing a jsEOROMutation " +
                " with applicationRate " + this.applicationRate +
                ", genesRate " + this.genesRate +
                ", min " + this.min +
                ", max " + this.max
                );

    },
    operate: function(_auxPop) {
        jsEOUtils.debugln("Applying jsEOROOpMutation");
        var toRet = new jsEOPopulation();
        var tam = _auxPop.getAt(0).length;
        var number_mutation = Math.ceil(_auxPop.length() * tam * this.genesRate);
        var chromosome = 0;
        var gen_mutation = 0;
        var gen_mutation_2 = 0;
        var value = 0;
        var newChr;
        for (var i = 0; i < number_mutation; ++i) {
            gen_mutation = Math.random() % ((_auxPop.length() * _auxPop.getAt(0).length) - 1);
            chromosome = gen_mutation / (_auxPop.getAt(0).length);
            gen_mutation_2 = gen_mutation % tam;
            while (gen_mutation_2 == gen_mutation) {
                gen_mutation_2 = Math.random()() % (tam - 1);
            }
            newChr = _auxPop.getAt(chromosome);
            jsEOUtils.debugln("  Individual is " + newChr);
            value = auxChr[gen_mutation];
            newChr[gen_mutation] = newChr[gen_mutation_2];
            newChr[gen_mutation_2] = value;
            //Preguntar a Victor donde se evalua al individuo una vez mutado
        }
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOFVIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

