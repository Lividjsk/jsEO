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
        
        //console.log("Entro en operador mutacion");
        var toRet = new jsEOPopulation();
        var gen_mutation = 0;
        var gen_mutation_2 = 0;
        var value = 0;
        var tmpChr = _auxPop.getAt(0).getChromosome();
        //console.log("Cromosoma seleccionado mutacion", tmpChr);
        var newChr = [];

        for (var i = 0; i < tmpChr.length; ++i) {
            newChr.push(tmpChr[i]);
        }
        gen_mutation = jsEOUtils.intRandom(1, tmpChr.length - 1);
        gen_mutation_2 = jsEOUtils.intRandom(1, tmpChr.length - 1);

        if (gen_mutation === gen_mutation_2) {
            do {
                gen_mutation_2 = jsEOUtils.intRandom(1, tmpChr.length - 1);
            } while (gen_mutation === gen_mutation_2);
        }


        jsEOUtils.debugln("  Individual is " + newChr);
        value = newChr[gen_mutation];
        newChr[gen_mutation] = newChr[gen_mutation_2];
        newChr[gen_mutation_2] = value;
        
        
        //console.log("Cromosoma mutado", newChr);
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOPIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});


