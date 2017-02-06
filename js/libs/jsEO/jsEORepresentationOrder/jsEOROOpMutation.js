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
        jsEOUtils.debugln("Applying jsEOROOpBitFlip");
        var toRet = new jsEOPopulation();
        var tmpChr = _auxPop.getAt(0).getChromosome();
        var newChr = [];
        jsEOUtils.debugln("  Individual is " + tmpChr);
        for (var i = 0; i < tmpChr.length; ++i) {
            newChr.push( (Math.random() < this.genesRate) ? (Math.random()*(this.max-this.min)+this.min) : tmpChr[i]);
        }
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOROIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

