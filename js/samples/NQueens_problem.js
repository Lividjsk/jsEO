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
var _Queens = 16;

function fitnessFunction(_chr) {

    if (typeof _chr == 'undefined') {
        return null;
    }

    //console.log( _chr.toString());
    var fitness = _chr.length;
    for (var i = 0; i < _chr.length && fitness>0; ++i) {
        for (var j = i+1; j < _chr.length && fitness>0; ++j) {
            fitness-=_chr[i].kills(_chr[j])?1:0;
        }
    }
    return fitness;
}

function main() {
    var verbose = jsEOUtils.getInputParam("verbose", false);
    jsEOUtils.setVerbose(verbose == "true" || verbose == true);
    //jsEOUtils.setProblemId("http://jsEO.vrivas.es/20171030120000_INTEGERS" + 10);

    
    
    var myPGA = new jsEOPGA(new jsEOOpSendIndividuals(), new jsEOOpGetIndividuals());

    myPGA.popSize = parseInt(jsEOUtils.getInputParam("popSize", 50));
    myPGA.tournamentSize = parseInt(jsEOUtils.getInputParam("tournamentSize", 2));
    myPGA.xOverRate = parseFloat(jsEOUtils.getInputParam("xOverRate", 10));
    myPGA.mutRate = parseFloat(jsEOUtils.getInputParam("mutRate", 10));
    myPGA.mutPower = parseFloat(jsEOUtils.getInputParam("mutPower", 0.6));
    myPGA.getIndividualsRate = jsEOUtils.getInputParam("getIndividualsRate", 1);    
    myPGA.numGenerations = parseInt(jsEOUtils.getInputParam("numGenerations", 200));
    myPGA.replaceRate = parseFloat(jsEOUtils.getInputParam("replaceRate", 0.5));
    myPGA.showing = parseInt(jsEOUtils.getInputParam("showing", 5));
    myPGA.minValue = parseInt(jsEOUtils.getInputParam("minValue", -10));
    myPGA.maxValue = parseInt(jsEOUtils.getInputParam("maxValue", 10));
    myPGA.indSize = parseInt(jsEOUtils.getInputParam("indSize", _Queens));
    console.log( jsEOUtils.getInputParam("maximize", true) );
    jsEOUtils.setMaximize(jsEOUtils.getInputParam("maximize", true) );
    console.log( jsEOUtils.getMaximize() );
    myPGA.run(fitnessFunction);

}