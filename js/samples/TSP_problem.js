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
var _numCities = 5;

//function MatrixDistancesCreation(_numberCities){
//    
//    var array = new Array(_numberCities);
//    for( var i = 0; i < _numberCities; ++i){
//        array[i] = new Array();
//        for( var j = 0; j < _numberCities; ++j){
//            if( i == j ){
//                array[i][j] = 0;
//            }else{
//                array[i][j] = Math.round(Math.random()*100);
//            }
//        }
//    }
//    return array;
//}
//
//function MatrixFlowsCreation(_numberCities){
//    
//    var array = new Array(_numberCities);
//    for( var i = 0; i < _numberCities; ++i){
//        array[i] = new Array();
//        for( var j = 0; j < _numberCities; ++j){
//            if( i == j ){
//                array[i][j] = 0;
//            }else{
//                array[i][j] = Math.round(Math.random()*100);
//            }
//        }
//    }
//    return array;
//}

//_cities = MatrixDistancesCreation(_numCities);
//_flows = MatrixFlowsCreation(_numCities);

_cities = new Array(_numCities);
_cities[0] = new Array(0, 10, 7, 3, 9);
_cities[1] = new Array(3, 0, 7, 5, 1);
_cities[2] = new Array(8, 2, 0, 4, 6);
_cities[3] = new Array(3, 5, 7, 0, 9);
_cities[4] = new Array(8, 7, 2, 4, 0);

_flows = new Array(_numCities);
_flows[0] = new Array(0, 2, 6, 4, 8);
_flows[1] = new Array(4, 0, 3, 5, 9);
_flows[2] = new Array(4, 4, 0, 4, 7);
_flows[3] = new Array(7, 3, 6, 0, 2);
_flows[4] = new Array(7, 10, 1, 10, 0);

function fitnessFunction(_chr) {
    
    if (typeof _chr == 'undefined') {
        return null;
    }
    
    var fitness = 0;
    var pos;
    for( var i = 0; i < _numCities; ++i){
        //console.log(_chr);
        pos = _chr[i];
        //console.log(pos);
        for ( var j = 0; j < _numCities; ++j) {
                fitness += parseInt(_flows[i][j] * _cities[pos][j]);
        } 
    }
    return fitness;
}

function main() {
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    //jsEOUtils.setProblemId("http://jsEO.vrivas.es/20171030120000_INTEGERS" + 10);

    
    
    var myROGA = new jsEOROGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());

    myROGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", 60));
    myROGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
    myROGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", 10));
    myROGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", 10));
    myROGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.6));
    myROGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);    
    myROGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", 50));
    myROGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.5));
    myROGA.showing = parseInt(jsEOUtils.getInputParam("showing", 3));
    myROGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
    myROGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
    myROGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _numCities));

    myROGA.run(fitnessFunction);

}
