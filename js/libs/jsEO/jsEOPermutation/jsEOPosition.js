/* 
 * Copyright (C) 2013 vrivas
 * Javier Guzman Garcia: jgg00045@red.ujaen.es
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
* Position for permutations
*
* @class jsEOPosition
*/
var jsEOPosition = new Class({
	/**
	* Index for the row
	* @property x
	* @type {Integer}
	* @default -1
	*/
    x: -1,
	/**
	* Index for the column
	* @property y
	* @type {Integer}
	* @default -1
	*/
    y: -1,
    /**
     * Initialization of the position
     * @method initialize
     * @param {Integer} _x Row
     * @param {Integer} _y Column
     * @return null
     */
    initialize: function( _x, _y){
        this.x = _x;
        this.y = _y;
    }
    , 
	/**
	  * Method get for row
	  * @method getX
	  * @return x
	  */
	 getX: function(){
        return this.x;
    }
    , 
	/**
	  * Method get for column
	  * @method getY
	  * @return y
	  */
	 getY: function(){
        return this.y;
    }
    , 
	/**
	  * Method set for row
	  * @method setX
	  * @param {Integer} _x Row
	  * @return This row
	  */
	 setX: function(_x){
        this.x = _x;
        return this;
    }
    , 
	/**
	  * Method set for column
	  * @method setY
	  * @param {Integer} _y
	  * @return This column
	  */
	 setY: function(_y){
        this.y = _y;
        return this;
    }
    ,
	/**
	 * Creation a random position
	 * @method createRandomPosition
	 * @param {Integer} _length
	 * @return position
	 */
	createRandomPosition: function(_length){
        var position = new jsEOPosition(jsEOUtils.intRandom(1, _length),jsEOUtils.intRandom(1, _length));
        return position;
    }
    ,
	/**
	 * Method set for modify a position randomly
	 * @method setRandomly
	 * @param {Integer} _length
	 * @return This position
	 */
	setRandomly: function(_length){
        this.x=jsEOUtils.intRandom(1, _length);
        this.y=jsEOUtils.intRandom(1, _length);
        return this;
    } 
    , 
	/**
	  * Compare tow positions
	  * @method eq
	  * @param {jsEOPosition} position
	  * @return Boolean True if they are the same and false but
	  */
	 eq: function (position) {
        return this.x===position.getX() && this.y===position.getY();
    }
    , 
	/**
	  * Method to check if 2 queens are eating each other
	  * @method kills
	  * @param {jsEOPosition} position
	  * @return Boolean True if eaten and false but
	  */
	 kills: function( position ) {
        return Math.abs(this.x-position.getX())===0 
                || Math.abs(this.y-position.getY())==0
                || Math.abs(this.x-position.getX())===Math.abs(this.y-position.getY());
    }
    , 
	/**
	  * Method get for the position
	  * @method getPosition
	  * @return BinaryExpression
	  */
	 getPosition: function(){
        return "{"+this.x+":"+this.y+"}";
    }
	, 
	/**
	  * Method get for the position in format JSON
	  * @method getJSON
	  * @return String in JSON
	  */
	 getJSON: function(){
		 
		return {"x": this.x, "y": this.y};
	}
});
