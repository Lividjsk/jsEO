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


/**
* Operator Get for individuals
*
* @class jsEOOpGetIndividuals
*/
var jsEOOpGetIndividuals = new Class({
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

    }
	,
    /**
     * Method get for the number of individuals
     * @method getNumIndividuals
     * @return This number of individuals
     */
    getNumIndividuals: function() {
        return this.numIndividuals;
    }
	,
    /**
     * Description Application of the operator
     * @method operate
     * @param {jsEOPopulation} _auxPop Population to get
     * @return toRet Population with the new individual
     */
    operate: function(_auxPop) {
        var toRet = new jsEOPopulation();
        var data2bSend = "data=" + jsEOUtils.getProblemId();
        jsEOUtils.debugln("  Sending a GetIndividual request with " + data2bSend);
		try {
			
            new Request({
                url: jsEOUtils.getGetURL(),
                method: 'GET',
                async: true,
                timeout: 1000,
                data: data2bSend,
                onSuccess: function(responseText) {
                    jsEOUtils.debugln('jsEOOpGetInddividual: Getting individuals conection response: ' +
                            responseText);
                    // Processing the individual
                    if( !responseText ) {return null;}
                    var fields = responseText.split(",");
                    var tmpInd = new jsEOIndividual();
                    if (fields.length - 2 > 1) {
                        tmpInd.setChromosome(fields.slice(1, fields.length - 1));
                    } else {
                        tmpInd.setChromosome(fields[1]);
                    }
                    tmpInd.setFitness(parseFloat(fields[fields.length - 1]));
                    jsEOUtils.debugln("jsEOOpGetInddividual: Adding the individual");
                    toRet.add(tmpInd);
                },
                onTimeout: function() {
                    jsEOUtils.debugln("jsEOOpGetIndividual: Timeout while conecting to " +
                            jsEOUtils.getSendURL());
                    this.cancel();
                },
                onFailure: function() {
                    this.cancel();
                    jsEOUtils.debugln("jsEOOpGetIndividual: Failure while conecting to " +
                            jsEOUtils.getSendURL());
                }

            }).send();
		}catch(error){
			jsEOUtils.debugln("jsEOOpGetIndividual: Error captured! ");
			return toRet;
		}
        return toRet;
    }
});