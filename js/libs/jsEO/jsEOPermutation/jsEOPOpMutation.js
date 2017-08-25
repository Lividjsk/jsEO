/* 
 * Copyright (C) 2017 jgg00045
 *
 * Javier Guzmán García: jgg00045@red.ujaen.es
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
        var gen_mutation = 0;
        var gen_mutation_2 = 0;
        var value = 0;
        var tmpChr = _auxPop.getAt(0).getChromosome();
        var newChr = [];

        for (var i = 0; i < tmpChr.length; ++i) {
            newChr.push(tmpChr[i]);
        }
		
		//Exchange mutation
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
        
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOPIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});


