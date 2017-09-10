/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * GeNeura Team- http://geneura.ugr.es
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
* jsEOOperator
*
* @class jsEOOperator
*/
var jsEOOperator = new Class({
	/**
	* Application Rate for the operator
	* @property applicationRate
	* @type {Integer}
	* @default null
	*/
    applicationRate: null,
    /**
     * Description Initialization of the operator
     * @method initialize
     * @param {Float} _applicationRate Probability for operator application
     * @return null
     */
    initialize: function(_applicationRate) {
        this.applicationRate = parseFloat( _applicationRate );
        jsEOUtils.debugln("Initializing a jsEOOperator with applicationRate " +
                this.applicationRate );
                

    },
    /**
     * Get the application rate for the operator
     * @method getApplicationRate
     * @return CallExpression
     */
    getApplicationRate: function() {
        return parseFloat( this.applicationRate );
    },
    /**
     * Set the application rate for the operator
     * @method setApplicationRate
     * @param {Integer} _newApplicationRate
     * @return This new application rate
     */
    setApplicationRate: function(_newApplicationRate) {
        return this.applicationRate = parseFloat( _newApplicationRate );
    },
    /**
     * Description Application of the operator
     * @method operate
     * @param {jsEOPopulation} _auxPop Population to operate
     * @return toRet Population with the new individual (s)
     */
    operate: function( _auxPop ) {
        return new jsEOPopulation() ;
    }
});


