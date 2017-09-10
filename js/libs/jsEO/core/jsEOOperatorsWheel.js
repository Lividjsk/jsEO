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
* jsEOOperator Wheel
*
* @class jsEOOperatorWheel
*/
var jsEOOperatorsWheel = new Class({
	 /**
	* Operators
	* @property operators
	* @type {Array}
	* @default Epmty
	*/
    operators: [],
	 /**
	* Application Rate Sum
	* @property applicationRateSum
	* @type {Integer}
	* @default null
	*/
    appRateSum: null,
    /**
     * Description Initialization of the operator
     * @method initialize
     * @param {Array} _operators Operators for algorithm
     * @return null
     */
    initialize: function(_operators) {
        this.appRateSum = 0;
        if (typeof _operators !== 'undefined') {
            this.operators = _operators;
            for (var i = 0; i < _operators.length; ++i) {
                this.appRateSum += parseFloat( _operators.getApplicationRate() );
            }
        }
        jsEOUtils.debugln("Initializing a jsEOOperatorsWheel " );
    },
    /**
     * Add an operator
     * @method addOperator
     * @param {jsEOOperator} _operator
     * @return This operators modify
     */
    addOperator: function(_operator) {
        this.operators.push(_operator);
        this.appRateSum += parseFloat( _operator.getApplicationRate() );
        jsEOUtils.debugln( "Adding to jsEOOperatorsWheel a new operator with appRate  "+
                _operator.getApplicationRate())
        return this;
    },
    /**
     * Remove an operator
     * @method removeOperator
     * @param {Number|jsEOOperator} _operator
     * @return This operators modify
     */
    removeOperator: function(_operator) {
        var pos;
        if (typeof _operator === "number") {
            pos = _operator;
        } else {
            pos = this.operators.indexOf(_operator);
        }
        var toRet = this.operators[pos];
        var last = this.operators.pop();
        if (pos < this.operators.length) {
            this.operators[pos] = last;
        }
        this.appRateSum -= parseFloat( toRet.getApplicationRate() );
        return this;
    },
    /**
     * Method get for operators
     * @method getOperators
     * @return This operators
     */
    getOperators: function() {
        return this.operators;
    },
    /**
     * Method get for one operator
     * @method getOperatorAt
     * @param {Integer} _i
     * @return This operator at position _i of null if don't exists
     */
    getOperatorAt: function(_i) {
        if (typeof _i == 'number' && _i >= 0 && _i < this.operators.length) {
            return this.operators[i];
        } else {
            return null;
        }
    },
    /**
     * Method set for operators
     * @method setOperators
     * @param {Array} _operators
     * @return This operators modify
     */
    setOperators: function(_operators) {
        if (typeof _operators !== 'undefined') {
            this.appRateSum = 0;
            this.operators = _operators;
            for (var i = 0; i < _operators.length; ++i) {
                this.appRateSum += parseFloat( _operators.getApplicationRate());
            }
        }
        return this;
    },
    /**
     * Method set for one operator
     * @method setOperatorAt
     * @param {Integer} _i
     * @param {jsEOOperator} _operator
     * @return This operator modify
     */
    setOperatorAt: function(_i, _operator) {
        if (typeof _i === 'number' && _i >= 0 && _i < this.operators.length) {
            this.appRateSum -= parseFloat( this.operators[i].getApplicationRate() ) + 
                    parseFloat( _operator.getOperatorRate() );
            this.operators[i] = _operator;
        }
        return this;
    },
    /**
     * Method get for the sum of application rates
     * @method getSumOfApplicationRates
     * @return This applicaction rate sum
     */
    getSumOfApplicationRates: function() {
        return this.appRateSum;
    },
    /**
     * Description Application of the operator
     * @method operate
     * @return This operator selected
     */
    operate: function() {
        var rnd = Math.random() * this.appRateSum;
        var i = 0;
        var tmp = this.operators[i].getApplicationRate();
        while (i < this.operators.length-1 && tmp < rnd) { // Adding -1 as at least 1 operator has to be chosen
            tmp += this.operators[++i].getApplicationRate();
        }
        jsEOUtils.debugln( "Selecting operator "+i+" "+this.appRateSum+" "+
                rnd );
        return this.operators[i];
    }
});



