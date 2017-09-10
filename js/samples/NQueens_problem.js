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
var _Queens;

/**
 * Fitness function
 * @method fitnessFunction
 * @param {Array} _chr
 * @return fitness
 */
function fitnessFunction(_chr) {

    if (typeof _chr == 'undefined') {
        return null;
    }

    var fitness = _chr.length-1;
    for (var i = 0; i < _chr.length && fitness>0; ++i) {
        for (var j = i+1; j < _chr.length && fitness>0; ++j) {
            fitness-=_chr[i].kills(_chr[j])?1:0;
        }
    }
    return fitness;
}

/**
 * Main function
 * @method main
 * @return null
 */
function main() {
    
	//Initialization of variables
	//In this case we retrieve the number of queens indicated for the problem
	if(params !== 'undefined')
    	_Queens = params.Queens;
	else
		_Queens = 6;
	
	//Calls to Functions
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("NQueens");
    
    var myPGA = new jsEOPGA(new jsEOOpSendIndividualsNode(), new jsEOOpGetIndividualsNode());

	if(params !== 'undefined'){
		myPGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", params.Poblation));
		myPGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
		myPGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", params.CrossOver));
		myPGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", params.Mutation));
		myPGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.6));
		myPGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);    
		myPGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", params.Generations));
		myPGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.4));
		myPGA.showing = parseInt(jsEOUtils.getInputParam("showing", 5));
		myPGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
		myPGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
		myPGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _Queens));
		jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", true) );
	}else{
		myPGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", 2000));
		myPGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
		myPGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", 10));
		myPGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", 10));
		myPGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.6));
		myPGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);    
		myPGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", 250));
		myPGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.4));
		myPGA.showing = parseInt(jsEOUtils.getInputParam("showing", 5));
		myPGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
		myPGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
		myPGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _Queens));
		jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", true) );
	}
	
	// Running algorithm
    myPGA.run(fitnessFunction);

}   
