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
* Operator for non-dominated ordering
*
* @class jsEOMOOpSortingND
*/
var jsEOMOOpSortingND = new Class({
    Extends: jsEOOperator,
    /**
     * Description Initialization of the operator
     * @method initialize
     * @param {Float} _applicationRate Probability for operator application
     * @param {Float} _bitsRate Probability of sorting
     * @return null
     */
    initialize: function (_applicationRate, _bitsRate) {
        this.parent(_applicationRate);
        this.bitsRate = _bitsRate;
        jsEOUtils.debugln("Initializing a jsEOROOpCrossOver with " +
                "applicationRate " + this.applicationRate);
    },
    /**
     * Description Application of the operator
     * @method operate
     * @param {jsEOPopulation} _auxPop Population to ordering
     * @return toRet Fronts of the population
     */
    operate: function (_auxPop) {

        var frentes = new Array();


        frentes[0] = new Array();


        //For each individual of the population we calculate the front to which belongs
        for (var i = 0; i < _auxPop.length(); ++i) {
            _auxPop.getAt(i).sp = [];
            _auxPop.getAt(i).np = 0;
            for (var j = 0; j < _auxPop.length(); ++j) {
                if (i === j)
                    continue;
                //Create this method. Returns true if individual i is better than individual j
                //If individual i is better than j, it gets into the set of individuals dominated by i
                if (_auxPop.getAt(i).dominated(_auxPop.getAt(j))) {
					
                    _auxPop.getAt(i).sp.push(_auxPop.getAt(j));
                    
                    //Otherwise, the level of dominance of the individual i
                } else if (_auxPop.getAt(j).dominated(_auxPop.getAt(i))) {
                    _auxPop.getAt(i).np += 1;
                }
            }
            //If the dominance level is 0, then go to the first front
            if (_auxPop.getAt(i).np === 0){
                _auxPop.getAt(i).rank = 0;
                frentes[0].push(_auxPop.getAt(i));
            }


            //Once the first front is created, we calculate the others
            var n = 0;

            //While the front i is not empty
            while (frentes[n].length !== 0) {
                var Q = new Array();
                //For each individual on the front
                for (var a = 0; a < frentes[n].length; ++a) {
                    var ind = frentes[n][a];
                    //For each individual of the dominated set of the individual i
                    for (var b = 0; b < ind.sp.length; ++b) {
                        //We obtain its level of dominance and we subtract 1
                        ind.sp[b].np -= 1;
                        //If its dominance level is 0, it goes to the set Q
                        if (ind.sp[b].np === 0) {
                            ind.sp[b].rank = n + 1;
                            Q.push(ind.sp[b]);
                        }
                    }
                }
                //Finally, we increase the front and we assign it
                ++n;
                if(typeof frentes[n] != "undefined" && frentes[n] != null && frentes[n].length > 0){
                    for(var l = 0; l < Q.length; ++l)
                        frentes[n].push(Q[l]);
                }else
                    frentes[n] = Q;
            }
        }
        //Returns the vector with the fronts
        return frentes;
    }
});