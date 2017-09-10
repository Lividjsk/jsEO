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


/**
* Operator Send for individuals
*
* @class jsEOOpSendIndividualsNode
*/
var jsEOOpSendIndividualsNode = new Class({
    Extends: jsEOOperator,
	/**
	* Number of individuals
	* @property numIndividuals
	* @type {Integer}
	* @default 1
	*/
    numIndividuals: 1,
    /**
     * Inizialization for operator
     * @method initialize
     * @param {Integer} _numIndividuals
     * @return null
     */
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
    /**
     * Method get for the number of individuals
     * @method getNumIndividuals
     * @return This number of individuals
     */
    getNumIndividuals: function() {
        return this.numIndividuals;
    },
    /**
     * Description Application of the operator
     * @method operate
     * @param {jsEOPopulation} _auxPop Population to send
	 * @pre _auxPop has to be ordered by fitness
     * @return toRet Population with the new individual
     */
    operate: function(_auxPop) {
        var tmpPop = new jsEOPopulation();
        

        var problemID = jsEOUtils.getProblemId();
        var solution = [],fitness = 0, matrixObj = [];
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
	    
            	fitness = _auxPop.getAt(i).getFitness();
     	    }

    	var data2bSend = {"Problem" : problemID, "Solution" : JSON.stringify(solution), "Fitness" : fitness, "tamIndividual": solution.length};
		try{
			new Request({
				url: jsEOUtils.getSendURL(),
				method: 'POST',
				data: data2bSend,
				onComplete: function(response){
					var res = JSON.parse(response);
					var result = {Solution: JSON.parse(res.Solution), Fitness: res.Fitness};
					console.log("Respuesta del servidor al enviar el individuo: ", res.msg);
				}
			}).send();
		}catch(error){
				console.log("Error al enviar el individuo: ", error);
		}
		
        return null;
    }
});
