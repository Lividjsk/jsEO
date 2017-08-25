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

var jsEOOpSendIndividualsNodeMO = new Class({
    Extends: jsEOOperator,
    numIndividuals: 1,
    initialize: function(_numIndividuals) {
        this.parent(1);
        if (typeof _numIndividuals === 'undefined') {
            _numIndividuals = 1;
        }
        // By the moment, we only store 1 individual
        _numIndividuals = 1;
        this.numIndividuals = _numIndividuals
        jsEOUtils.debugln("Initializing a jsEOOpSendIndividuals " +
                " with applicationRate " + this.applicationRate +
                ", numIndividuals " + this.numIndividuals
                );

    },
    getNumIndividuals: function() {
        return this.numIndividuals;
    },
    /// @pre _auxPop has to be ordered by fitness
    operate: function(_auxPop) {
        var tmpPop = new jsEOPopulation();
        

        var problemID = jsEOUtils.getProblemId();
        var solution = [],fitness = [], matrixObj = [];
        for (var i = 0; i < this.numIndividuals; ++i) {
            var tmpChr = _auxPop.getAt(i).getChromosome();
            if (Object.prototype.toString.call(tmpChr) === '[object Array]') {
                for (var j = 0; j < tmpChr.length; ++j) {
                    if(Object.prototype.toString.call(tmpChr[j]) === '[object Object]')
                        solution.push(tmpChr[j].getJSON());
                    else
                        solution.push(tmpChr[j]);
                }
            } else {
                solution = tmpChr;
            }
	    
            	fitness = _auxPop.getAt(i).getObjectives();
     	    }

		var id = jsEOUtils.intRandom(1, Number.MAX_SAFE_INTEGER);;
    	var data2bSend = {"id": id, "Problem" : problemID, "Solution" : JSON.stringify(solution), 
						  "Objectives" : JSON.stringify(fitness)};
	
		try{
			new Request({
				url: jsEOUtils.getSendURL(),
				method: 'POST',
				data: data2bSend,
				onComplete: function(response){
					var res = JSON.parse(response);
					var result = {Solution: JSON.parse(res.Solution), Objectives: JSON.parse(res.Objectives)};
					console.log("Response of the server when sending individual", res.msg);
				}
			}).send();
	}catch(error){
		console.log("Error sending individual");
	}
        return null;
    }
});