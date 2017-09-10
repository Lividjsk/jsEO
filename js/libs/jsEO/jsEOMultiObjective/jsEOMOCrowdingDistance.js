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

/**
* Operator for Crowding Distance
*
* @class jsEOMOCrowdingDistance
*/
var jsEOMOCrowdingDistance = new Class({
    Extends: jsEOOperator,
     /**
     * Description Initialization of the operator
     * @method initialize
     * @param {Float} _applicationRate Probability for operator application
     * @param {Float} _bitsRate Probability of crowding distance
     * @return null
     */
    initialize: function (_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " +
                "applicationRate " + this.applicationRate);
    },
    /**
     * Application of the operator
     * @method operate
     * @param {Array} _aFront Front for ordering
     * @param {Array} _numberObjectives Number of objectives
     * @return _aFront Front ordered
     */
    operate: function (_aFront, _numberObjectives) {

        //This method does what is done as a function of the number of objectives
		//to be satisfied is calculating the distance of each individual from the front
		//that is passed as a function of the individuals who are on his left and his right.
		//Finally it returns the front with the individuals but already these with its distance
        if(_aFront.length == 0)
            return _aFront;
        
        for (var i = 0; i < _numberObjectives; ++i) {
            this.sortMO(_aFront, i);
            _aFront[0].crowding = 9999999;
            _aFront[(_aFront.length - 1)].crowding = 9999999;
            for (var j = 1; j < _aFront.length - 1; ++j) {
                _aFront[j].crowding += (_aFront[j + 1].matrixObjectives[i] - _aFront[j - 1].matrixObjectives[i]);
            }
        }
        return _aFront;
    }
    , 
	/**
	  * Sort the population by objectives
	  * @method sortMO
	  * @param {jsEOPopulation} _aPop Population to order
	  * @param {Integer} obj_index Number of the objective
	  * @return This population ordered
	  */
	 sortMO: function (_aPop, obj_index) {

        if(_aPop.length == 1)
            return this;
        
        var ind1 = 0, ind2 = 0;
		for (var i = (_aPop.length - 1); i > -1; --i) {
            for (var j = 1; j < (i + 1); ++j) {
                ind1 = _aPop[j - 1];
                ind2 = _aPop[j];

                if (ind1.getFitnessAt(obj_index) > ind2.getFitnessAt(obj_index)) {
                    _aPop[j - 1] = ind2;
                    _aPop[j] = ind1;
                }
            }
        }
        return this;
    }
});
