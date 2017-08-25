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


var jsEOPOpCrossOver = new Class({
	Extends: jsEOOperator,
	initialize: function(_applicationRate, _bitsRate) {
		this.parent(_applicationRate);
		this.bitsRate = _bitsRate;
		jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " + "applicationRate " + this.applicationRate);
	},
	operate: function(_auxPop) {
		jsEOUtils.debugln("Applying jsEOROOpCrossOver");
		var toRet = new jsEOPopulation();

		//If the population type is not defined, a new population is returned
		if (typeof _auxPop == 'undefined') {
			return toRet;
		}

		if (_auxPop.length() <= 0) {
			toRet.add(_auxPop.getAt(0).copy());
			return toRet;
		}

		var rnd2 = jsEOUtils.intRandom(1, _auxPop.length() - 1);

		var tmpChr1 = _auxPop.getAt(0).getChromosome().slice();

		var tmpChr2 = _auxPop.getAt(rnd2).getChromosome().slice();
		var newChr = [];
		var orderChr = [];
		var auxChr = [];

		var point = jsEOUtils.intRandom(1, (tmpChr1.length - 2));

		//CrossOver OX
		for (var i = 0; i < point; ++i)
		newChr.push(tmpChr1[i]);

		for (var j = 0; j < tmpChr2.length; ++j)
		orderChr.push(tmpChr2[j]);

		for (var n = 0; n < newChr.length; ++n) {
			var index = jsEOUtils.exists(newChr, orderChr);
			if (index != -1) orderChr.splice(index, 1);
		}

		var m = 0;
		while (newChr.length < tmpChr1.length) {
			newChr.push(orderChr[m]);
			++m;
		}


		jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr);
		toRet.add(new jsEOPIndividual());
		toRet.getAt(0).setChromosome(newChr);
		return toRet;
	}
});