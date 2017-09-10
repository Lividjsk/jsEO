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

var _numCities;

var _cities = [[0, 77, 131, 148, 19, 192, 24, 179], //0
				[77, 0, 163, 108, 137, 189, 187, 188], //1
				[131, 163, 0, 56, 79, 120, 151, 80], //2 
				[148, 108, 56, 0, 154, 155, 69, 56], //3
				[19, 137, 79, 154, 0, 102, 176, 99], //4
				[192, 189, 120, 155, 102, 0, 63, 142], //5
				[24, 187, 151, 69, 176, 63, 0, 139], //6
			    [179, 188, 80, 56, 99, 142, 139, 0]]; //7

var _times = [[0, 141, 150, 57, 11, 188, 23, 107], 
			  	[141, 0, 72, 2, 160, 187, 7, 71],
				[150, 72, 0, 63, 99, 45, 18, 140],
				[57, 2, 63, 0, 199, 42, 64, 24],
				[11, 160, 99, 199, 0, 153, 151, 135],
				[188, 187, 45, 42, 153, 0, 90, 168],
				[23, 7, 18, 64, 151, 90, 0, 12],
				[107, 71, 140, 24, 135, 168, 12, 0]];

//Calculation of the distance matrix
/**
 * Description
 * @method MatrixDistancesCreation
 * @param {} _numberCities
 * @return array
 */
/*
function MatrixDistancesCreation(_numberCities) {


    _positions = new Array();
    var _x = 0, _y = 0;
    for(var n = 0; n < _numberCities; ++n){
        _x = jsEOUtils.intRandom(-370, 370);
        _y = jsEOUtils.intRandom(-370, 370);
        var obj = { 'x': _x, 'y': _y};
        _positions.push(obj);
    }

    //We calculate the initial matrix
    var array = new Array(_numberCities);
    for (var i = 0; i < _numberCities; ++i) {
        array[i] = new Array(_numberCities);
        for (var j = 0; j < _numberCities; ++j) {
            array[i][j] = 1;
        }
    }

    //Now we set the main diagonal to zero
    for (var n = 0; n < _numberCities; ++n) {
        for (var m = 0; m < _numberCities; ++m) {
            if (array[n][m] == 1) {
                if (n == m)
                    array[n][m] = 0;
                else {
                    array[n][m] = jsEOUtils.intRandom(1, 100);
                    array[m][n] = array[n][m];
                }
            }
        }
    }

    return array;
}
*/
//Calculation of the time matrix
/**
 * Description
 * @method MatrixTimesCreation
 * @param {} _numberCities
 * @return array
 */
/*
function MatrixTimesCreation(_numberCities) {


    //We calculate the initial matrix
    var array = new Array(_numberCities);
    for (var i = 0; i < _numberCities; ++i) {
        array[i] = new Array(_numberCities);
        for (var j = 0; j < _numberCities; ++j) {
            array[i][j] = 1;
        }
    }

    //Now we set the main diagonal to zero
    for (var n = 0; n < _numberCities; ++n) {
        for (var m = 0; m < _numberCities; ++m) {
            if (array[n][m] == 1) {
                if (n == m)
                    array[n][m] = 0;
                else {
                    array[n][m] = jsEOUtils.intRandom(1, 100);
                    array[m][n] = array[n][m];
                }
            }
        }
    }
    return array;
}
*/

//Fitness Function
/**
 * Description
 * @method fitnessFunction
 * @param {} _chr
 * @return objectives
 */
function fitnessFunction(_chr) {

    if (typeof _chr == 'undefined') {
        return null;
    }

    var objectives = new Array(2);

    var fitness = 0;
    var pos, sig;
    for (var i = 0; i < _numCities; ++i) {
        pos = _chr[i];
        sig = (i < _numCities - 1) ? _chr[i + 1] : _chr[0];
        fitness += parseInt(_cities[pos][sig]);
    }
    
    objectives[0] = fitness;
    
    fitness = 0;
    for (var i = 0; i < _numCities; ++i) {
        pos = _chr[i];
        sig = (i < _numCities - 1) ? _chr[i + 1] : _chr[0];
        fitness += parseInt(_times[pos][sig]);
    }
    
    objectives[1] = fitness;
    
    return objectives;
}

/**
 * Description
 * @method main
 * @return 
 */
function main() {
    
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("TSP_MO");
    
    //Initialization of variables
	//In this case we retrieve the number of cities indicated for the problem
    if(params !== 'undefined')
    	_numCities = params.Cities;
	else
		_numCities = 6;

    var myMOGA = new jsEOMOTSPGA(new jsEOOpSendIndividualsNodeMO(), new jsEOOpGetIndividualsNodeMO(), 2);

	if(params !== 'undefined'){
		myMOGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", params.Poblation));
		myMOGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
		myMOGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", params.CrossOver));
		myMOGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", params.Mutation));
		myMOGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.5));
		myMOGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 5);
		myMOGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", params.Generations));
		myMOGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.5));
		myMOGA.showing = parseInt(jsEOUtils.getInputParam("showing", 5));
		myMOGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
		myMOGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
		myMOGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _numCities));
		//myMOGA.positionsTSP = jsEOUtils.getInputParam("positionsTSP", _positions);
		jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", false));
	}else{
		myMOGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", 100));
		myMOGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
		myMOGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", 10));
		myMOGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", 10));
		myMOGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.5));
		myMOGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 5);
		myMOGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", 500));
		myMOGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.5));
		myMOGA.showing = parseInt(jsEOUtils.getInputParam("showing", 5));
		myMOGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
		myMOGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
		myMOGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _numCities));
		//myMOGA.positionsTSP = jsEOUtils.getInputParam("positionsTSP", _positions);
		jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", false));
	}
	
	// Running algorithm
    myMOGA.run(fitnessFunction);

}
