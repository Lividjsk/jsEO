/* 
 * Copyright (C) 2013 vrivas
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

var jsEOOpGetIndividualsNodeMO = new Class({
	Extends: jsEOOperator,
	numIndividuals: 1,
	initialize: function(_appRate) {
		this.parent(_appRate);
		if (typeof _numIndividuals === 'undefined' || !_numIndividuals) {
			_numIndividuals = 1;
		}
		this.numIndividuals = 1;
		jsEOUtils.debugln("Initializing a jsEOOpGetIndividuals " + " with applicationRate " + this.applicationRate + ", numIndividuals " + this.numIndividuals);

	},
	getNumIndividuals: function() {
		return this.numIndividuals;
	},
	operate: function(_auxPop) {
		var toRet = _auxPop;

		var data2bSend = {
			"data": jsEOUtils.getProblemId(),
			"tamIndividual": _auxPop.getAt(0).getChromosome().length
		};
		jsEOUtils.debugln("  Sending a GetIndividual request with " + data2bSend);
		try {
			new Request.JSON({
				url: jsEOUtils.getGetURL(),
				method: 'GET',
				data: data2bSend,
				onComplete: function(response) {
					if (!response.Success) {
						console.log("Error: " + response.msg);
						return;
					} else {
						console.log("Server response when requesting individual:", response.msg);
						if (response.Solution != null) {
							var newInd = new jsEOMOIndividual();
							newInd.setChromosome(JSON.parse(response.Solution));
							newInd.setObjectives(JSON.parse(response.Objectives));
							toRet.add(newInd);
							console.log("Successfully incorporated individual to the population");
						} else {
							toRet = _auxPop;
						}
					}
				}
			}).send();
		} catch (err) {
			jsEOUtils.debugln("jsEOOpGetIndividual: Error captured! ");
			return toRet = _auxPop;
		}

		return toRet;
	}
});