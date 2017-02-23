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

function fitnessFunction(_cities,_chr) {
    
    var fitness = 0, position;
    for( var i = 0; i < _chr.length; ++i){
        position = _chr[i];
        for ( var j = 0; j < _chr; ++j) {
            fitness = fitness + _cities[position][j];
        } 
    }
    return fitness;
}

function MatrixCreation(_numberCities){
    
    cities = new Array(_numberCities);
    for( var i = 0; i < _numberCities; ++i){
        cities[i] = new Array(_numberCities);
        for( var j = 0; j < _numberCities; ++j){
            if( i == j ){
                cities[i][j] = 0;
            }else{
                cities[i][j] = Math.round(Math.random()*1000);
            }
        }
    }
    return cities;
}

function main() {
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    jsEOUtils.setProblemId("http://jsEO.vrivas.es/20171030120000_INTEGERS" + 10);

    
    
    var myROGA = new jsEOFVGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());

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
    myROGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", 10));

    myROGA.run(fitnessFunction);

}