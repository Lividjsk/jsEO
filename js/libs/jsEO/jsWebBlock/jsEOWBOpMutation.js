/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var jsEOWBOpMutation = new Class({
    Extends: jsEOOperator,
    mutPower: null,
    min: null,
    max: null,
    initialize: function(_applicationRate, _mutPower, _min, _max) {
        this.parent(_applicationRate);
        this.mutPower = _mutPower;
        this.min = _min;
        this.max = _max;
        jsEOUtils.debugln("Initializing a jsEOFVMutation " +
                " with applicationRate " + this.applicationRate +
                ", mutPower " + this.mutPower +
                ", min " + this.min +
                ", max " + this.max
                );

    },
    operate: function(_auxPop) {
        jsEOUtils.debugln("Applying jsEOWBMutation");
        var toRet = new jsEOPopulation();
        var tmpChr = _auxPop.getAt(0).getChromosome();
        var newChr = new Array();
        for (var i = 0; i < tmpChr.length; ++i) {
            newChr.push(tmpChr[i]);
        }
        jsEOUtils.debugln("  Individual is " + tmpChr);
        for (var i = 0; i < tmpChr.length; ++i) {
            var pos1 = parseInt(Math.random() * tmpChr.length);
            var pos2 = parseInt(Math.random() * tmpChr.length);

            if ((Math.random() < this.bitsRate)) {
                var tmp = newChr[pos1];
                newChr[pos1] = newChr[pos2];
                newChr[pos2] = tmp;
            }
        }
        jsEOUtils.debugln("  Final  " + newChr);
        toRet.add(new jsEOFVIndividual());
        toRet.getAt(0).setChromosome(newChr);
        return toRet;
    }
});

