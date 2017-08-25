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
var _positions;


//Calculation of the distance matrix
function MatrixDistancesCreation(_numberCities) {

	_positions = new Array();
	var _x = 0,
		_y = 0;
	for (var n = 0; n < _numberCities; ++n) {
		_x = jsEOUtils.intRandom(-370, 370);
		_y = jsEOUtils.intRandom(-370, 370);
		var obj = {
			'x': _x,
			'y': _y
		};
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
				if (n == m) array[n][m] = 0;
				else {
					array[n][m] = parseInt(Math.sqrt(Math.pow(_positions[m].x - _positions[n].x, 2) + Math.pow(_positions[m].y - _positions[n].y, 2)));
					array[m][n] = array[n][m];
				}
			}
		}
	}

	return array;
}

//Function to calculate the greedy solution
function greedySolution() {
	var solucion = [0];
	var ciudades = [];
	var toRet = [];
	var costeTotal = 0;
	for (var i = 1; i < _numCities; ++i) {
		ciudades.push(i);
	}
	var ultimaCiudad = 0;
	while (ciudades.length) {
		var minCoste = -1,
			elegida = -1;
		for (var i = 0; i < ciudades.length; ++i) {
			var coste = _cities[ultimaCiudad][ciudades[i]];
			if (minCoste < 0 || coste < minCoste) {
				minCoste = coste;
				elegida = i;
			}
		}
		costeTotal += minCoste;
		ultimaCiudad = ciudades[elegida];
		solucion.push(ultimaCiudad);
		ciudades.splice(elegida, 1);

	}
	costeTotal += _cities[ultimaCiudad][0];
	toRet.push(solucion);
	toRet.push(costeTotal);
	return toRet;
}

//Fitness Function
function fitnessFunction(_chr) {

	if (typeof _chr == 'undefined') {
		return null;
	}

	var fitness = 0;
	var pos, sig;
	for (var i = 0; i < _numCities; ++i) {
		pos = _chr[i];
		sig = (i < _numCities - 1) ? _chr[i + 1] : _chr[0];
		fitness += _cities[pos][sig];
	}
	return fitness;
}

function main() {



	//Initialization of variables
	//En este caso recuperamos el numero de ciudades indicadas para el problema
	if (cities !== 'undefined') _numCities = cities;
	else _numCities = 6;

	//Calls to Functions
	_cities = MatrixDistancesCreation(_numCities);


	var verbose = jsEOUtils.getInputParam("verbose", false);
	jsEOUtils.setVerbose(verbose == "true" || verbose == true);
	jsEOUtils.setProblemId("TSP");

	//Solution greedy
	var greedy = greedySolution();

	var myROGA = new jsEOROGA(new jsEOOpSendIndividualsNode(), new jsEOOpGetIndividualsNode());

	myROGA.popSize = jsEOUtils.getInputParam("popSize", 1000);
	myROGA.tournamentSize = jsEOUtils.getInputParam("tournamentSize", 2);
	myROGA.xOverRate = jsEOUtils.getInputParam("xOverRate", 10);
	myROGA.mutRate = jsEOUtils.getInputParam("mutRate", 10);
	myROGA.mutPower = jsEOUtils.getInputParam("mutPower", 0.5);
	myROGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);
	myROGA.numGenerations = jsEOUtils.getInputParam("numGenerations", 100);
	myROGA.replaceRate = jsEOUtils.getInputParam("replaceRate", 0.5);
	myROGA.showing = jsEOUtils.getInputParam("showing", 6);
	myROGA.indSize = jsEOUtils.getInputParam("indSize", _numCities);
	myROGA.positionsTSP = jsEOUtils.getInputParam("positionsTSP", _positions);
	jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", false));
	jsEOUtils.setGreedy(jsEOUtils.getInputParam("greedySolution", greedy));

	// Running algorithm
	myROGA.run(fitnessFunction);

}