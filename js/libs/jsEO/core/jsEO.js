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
* jsEO
*
* @class jsEO
*/
var jsEO = new Class({
    fitness:null
    , 
	/**
	  * Inicialization for jsEO
	  * @method initialize
	  * @return null
	  */
	 initialize: function(){
        jsEOUtils.debug( "Initializing a jsEO <br/>");
    }
    , 
	/**
	  * Copy for jsEO
	  * @method copy
	  * @return toRet
	  */
	 copy: function() {
        var toRet=new jsEO();
        toRet.fitness=this.fitness;
        return toRet;
    }
    , 
	/**
	  * Method get for fitness
	  * @method getFitness
	  * @return This fitness
	  */
	 getFitness: function() {
        return this.fitness;
    }
    , 
	/**
	  * Method set for fitness
	  * @method setFitness
	  * @param {Integer} _fitness
	  * @return This fitness modify
	  */
	 setFitness: function(_fitness) {
        this.fitness=_fitness;
        return this;
    }
    // comparison for sort
    , 
	/**
	  * Comparison for fitness
	  * @method compare
	  * @param {jsEOIndividual} _eo
	  * @return Boolean 
	  */
	 compare: function( _eo ) {
        return( this.fitness<_eo.fitness?-1:(this.fitness==_eo.fitness?0:1));
    }
    // Less than
    , 
	/**
	  * Less than other individual
	  * @method lt
	  * @param {jsEOIndividual} _eo
	  * @return Boolean
	  */
	 lt: function( _eo ) {
        return this.fitness<_eo.fitness;
    }
    // Equal to
    , 
	/**
	  * Equal to other individual
	  * @method eq
	  * @param {jsEOIndividual} _eo
	  * @return Boolean
	  */
	 eq: function( _eo ) {
       return this.fitness===_eo.fitness; 
    }
    // Greater than
    , 
	/**
	  * Greater than other individual
	  * @method gt
	  * @param {jsEOIndividual} _eo
	  * @return Boolean
	  */
	 gt: function( _eo ) {
        return ! (this.lt(_eo) || this.eq( _eo ) );
    }
    // Less than or equal to
    , 
	/**
	  * Less or equal than other individual
	  * @method le
	  * @param {jsEOIndividual} _eo
	  * @return Boolean
	  */
	 le: function( _eo ) {
        return !this.gt(_eo);
    }
    // Greater than or equal to
    , 
	/**
	  * Greater or equal than other individual
	  * @method ge
	  * @param {jsEOIndividual} _eo
	  * @return Boolean
	  */
	 ge: function( _eo ) {
        return !this.lt(_eo);
    }
});

