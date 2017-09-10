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
* Selector Tournament for individuals
*
* @class jsEOOpSelectorTournament
*/
var jsEOOpSelectorTournament = new Class({
    Extends: jsEOOperator,
	/**
	* Tournament size
	* @property tournamentSize
	* @type {Integer}
	* @default null
	*/
    tournamentSize: null,
	/**
	* Number of individuals
	* @property numIndividuals
	* @type {Integer}
	* @default null
	*/
    numIndividuals: null, 
    /**
     * Inizialization for the operator
     * @method initialize
     * @param {Integer} _tournamentSize
     * @param {Integer} _numIndividuals
     * @return null
     */
    initialize: function(_tournamentSize, _numIndividuals ) {
        this.parent(1);
        if (typeof _tournamentSize === 'undefined') {
            _tournamentSize = 2;
        }
        if (typeof _numIndividuals === 'undefined') {
            _numIndividuals = 1;
        }
        this.tournamentSize = _tournamentSize;
        this.numIndividuals = _numIndividuals
        jsEOUtils.debugln("Initializing a jsEOOpSelectorTournament " +
                " with applicationRate " + this.applicationRate +
                ", tournamentSize " + this.tournamentSize +
                ", numIndividuals " + this.numIndividuals 
                );

    },
    /**
     * Method get for the tournament size
     * @method getTournamentSize
     * @return This tournament size
     */
    getTournamentSize: function () {
        return this.tournamentSize;
    },
    /**
     * Method get for the number of individuals
     * @method getNumIndividuals
     * @return This number of individuals
     */
    getNumIndividuals: function () {
        return this.numIndividuals;
    },
    /**
     * Method set for the tournament size
     * @method setTournamentSize
     * @param {Integer} _value
     * @return This tournament size modify
     */
    setTournamentSize: function ( _value ) {
        this.tournamentSize=_value;
        return this;
    },
    /**
     * Method set for the number of individuals
     * @method setNumIndividuals
     * @param {Integer} _value
     * @return This number of individuals modify
     */
    setNumIndividuals: function ( _value ) {
        this.numIndividuals=_value;
        return this;
    },
    
    /**
     * Description Application of the operator
     * @method operate
     * @param {jsEOPopulation} _auxPop 
     * @return toRet Population with the individuals selected
     */
    operate: function( _auxPop ) {
        var toRet = new jsEOPopulation();
        for (var j = 0; j <this.numIndividuals; ++j) {
            var tmpInd = Math.floor(Math.random() * _auxPop.length());
            for (var i = 1; i < this.tournamentSize; ++i) {
                rnd = Math.floor(Math.random() * _auxPop.length());
                jsEOUtils.debugln("  Comparando  " + 
                        _auxPop.getAt(rnd).getFitness() +
                        " con " + _auxPop.getAt(tmpInd).getFitness());
                tmpInd = (_auxPop.getAt(rnd).gt(_auxPop.getAt(tmpInd))) ? rnd : tmpInd;
            }
            jsEOUtils.debugln("  Final  " + _auxPop.getAt(tmpInd).getFitness());
            toRet.add(_auxPop.getAt(tmpInd).copy());
        }
        return toRet;
    }
});

