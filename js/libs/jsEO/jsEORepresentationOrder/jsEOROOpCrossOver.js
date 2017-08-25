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


var jsEOROOpCrossOver = new Class({
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

		//Basic CrossOver
		var rnd2 = jsEOUtils.intRandom(1, _auxPop.length() - 1);

		var tmpChr1 = _auxPop.getAt(0).getChromosome().slice();

		var tmpChr2 = _auxPop.getAt(rnd2).getChromosome().slice();

		var point1 = Math.floor(tmpChr1.length / 2);

		//The cut-off point is chosen, which will go from position 2 to that point,
		//which will always be half the size
		var newChr = [];
		var auxChr = [];
		var orderChr = tmpChr2.slice();

		//The subsequence of the first parent is copied to an auxiliary individual
		for (var i = 1; i <= point1; ++i) {
			auxChr.push(tmpChr1[i]);
		}

		//Once the subsequence is copied, the elements that have been copied
		//and copied in the corresponding orderand more similar to that of the second parent
		for (var i = 0; i < auxChr.length; ++i) {
			var index = orderChr.indexOf(auxChr[i]);
			if (index != -1) {
				orderChr.splice(index, 1);
			}
		}
		orderChr.splice(0, 1);

		newChr.push(0);

		for (var j = 0; j < auxChr.length; ++j) {
			newChr.push(auxChr[j]);
		}

		for (var n = 0; n < orderChr.length; ++n) {
			newChr.push(orderChr[n]);
		}

		jsEOUtils.debugln("  Inicio es " + tmpChr1 + " Final  " + newChr);
		toRet.add(new jsEOROIndividual());
		toRet.getAt(0).setChromosome(newChr);
		return toRet;
	}
});