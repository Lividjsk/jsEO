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
var _cities;
var _times;
var _positions;


function MatrixDistancesCreation(_numberCities) {


    _positions = new Array();
    var _x = 0, _y = 0;
    for(var n = 0; n < _numberCities; ++n){
        _x = jsEOUtils.intRandom(-370, 370);
        _y = jsEOUtils.intRandom(-370, 370);
        var obj = { 'x': _x, 'y': _y};
        _positions.push(obj);
    }

    //Calculamos la matriz inicial
    var array = new Array(_numberCities);
    for (var i = 0; i < _numberCities; ++i) {
        array[i] = new Array(_numberCities);
        for (var j = 0; j < _numberCities; ++j) {
            array[i][j] = 1;
        }
    }

    //Ahora ponemos la diagonal principal a cero
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

function MatrixTimesCreation(_numberCities) {


    //Calculamos la matriz inicial
    var array = new Array(_numberCities);
    for (var i = 0; i < _numberCities; ++i) {
        array[i] = new Array(_numberCities);
        for (var j = 0; j < _numberCities; ++j) {
            array[i][j] = 1;
        }
    }

    //Ahora ponemos la diagonal principal a cero
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

function main() {
    
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("TSP_MO");
    
    
    _numCities = 5;

    _cities = MatrixDistancesCreation(_numCities);
    _times = MatrixTimesCreation(_numCities);

    var myMOGA = new jsEOMOTSPGA(new jsEOOpSendIndividualsNodeMO(), new jsEOOpGetIndividualsNodeMO(), 2);

    myMOGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", 500));
    myMOGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
    myMOGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", 10));
    myMOGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", 10));
    myMOGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.6));
    myMOGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 5);
    myMOGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", 50));
    myMOGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.5));
    myMOGA.showing = parseInt(jsEOUtils.getInputParam("showing", 6));
    myMOGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
    myMOGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
    myMOGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _numCities));
    myMOGA.positionsTSP = jsEOUtils.getInputParam("positionsTSP", _positions);
    jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", false));
    myMOGA.run(fitnessFunction);

}
