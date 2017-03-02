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
    initialize: function (_applicationRate, _genesRate, _min, _max) {
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
    operate: function (_auxPop) {
        jsEOUtils.debugln("Applying jsEOROOpMutation");
        var toRet = new jsEOPopulation();
        var number_mutation = Math.ceil(tam * this.genesRate);
        var gen_mutation = 0;
        var gen_mutation_2 = 0;
        var value = 0;
        var newChr;
        var tam = _auxPop.getAt(i).length;
        for (var i = 0; i < _auxPop.length(); ++i) {    
            for (var j = 0; j < number_mutation; ++j) {
                gen_mutation = jsEOUtils.intRandom(1, _auxPop.getAt(0).length - 1);
                do {
                    gen_mutation2 = jsEOUtils.intRandom(1, _auxPop.getAt(0).length - 1);
                } while (gen_mutation == gen_mutation2);

                newChr = _auxPop.getAt(i).slice();
                jsEOUtils.debugln("  Individual is " + newChr);
                value = newChr[gen_mutation];
                newChr[gen_mutation] = newChr[gen_mutation_2];
                newChr[gen_mutation_2] = value;
                jsEOUtils.debugln("  Final  " + newChr);
                toRet.add(new jsEOROIndividual());
                toRet.getAt(0).setChromosome(newChr);
            }
        }
        return toRet;
    }
});


