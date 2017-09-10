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
* Operator Get for individuals
*
* @class jsEOOpGetIndividualsNode
*/
var jsEOOpGetIndividualsNode = new Class({
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
     * @param {Integer} _appRate
     * @return null
     */
    initialize: function(_appRate) {
        this.parent(_appRate);
        if (typeof _numIndividuals === 'undefined' || !_numIndividuals) {
            _numIndividuals = 1;
        }
        this.numIndividuals = 1;
        jsEOUtils.debugln("Initializing a jsEOOpGetIndividuals " +
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
     * @param {jsEOPopulation} _auxPop Population to get
     * @return toRet Population with the new individual
     */
    operate: function(_auxPop) {
        var toRet = _auxPop;
        
        var data2bSend = {"data": jsEOUtils.getProblemId(), "tamIndividual": _auxPop.getAt(0).getChromosome().length};
        jsEOUtils.debugln("Enviando solicitud de individuo para " + data2bSend);
        try {
			new Request.JSON({
				url: jsEOUtils.getGetURL(),
				method: 'GET',
				data: data2bSend,
				onComplete: function(response){
					if(response.Success === false){
						console.log("Error: "+response.msg);
						return;
					}else{
						console.log("Respuesta del servidor para el individuo solicitado: ", response.msg);
						if(response.Solution.length > 0){
							var newInd = new jsEOIndividual();
							newInd.setChromosome(JSON.parse(response.Solution));
							newInd.setFitness(response.Fitness);
							toRet.add(newInd);
							console.log("Individuo incorporado con exito a la poblacion", newInd);
						}else{
							toRet = _auxPop;
						}
					}
				}
			}).send();
        } catch (err) {
            jsEOUtils.debugln("jsEOOpGetIndividual: Error captured! ");
            return toRet=_auxPop;
        }        
        return toRet;
    }
});
