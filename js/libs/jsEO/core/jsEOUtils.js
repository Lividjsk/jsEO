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




/* global google, vis */

var jsEOUtils = {
    verbose: false
    , bestFit: []
    , worstFit: []
    , averageFit: []
    , positionsTSP: []
    , greedySolution: []
    , idOutput: "jsEOConsole"
    , idGraphics: "jsEOGraphics"
    , idChart: "myChart"
    , problemID: null
    , getURL: "./receiving"
    , sendURL: "./sending"
    , proxyURL: ""
    , showing: 3
    , maximize: true
    , network: 0
	, chart: 0
    , setOutput: function (_id) {
        if (typeof _id != 'undefined') {
            this.idOutput = _id;
        }
        return this;
    }
    , setGraphics: function (_id) {
        if (typeof _id != 'undefined') {
            this.idGraphics = _id;
        }
        return this;
    }
    , print: function (_message, _id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idOutput;
        }
        var element = document.getElementById(_id);
        if (element) {
            element.innerHTML += _message;
        }
        return this;
    }
    , replace: function (_message, _id) {
        this.clear(_id);
        this.print(_message, _id);
        return this;
    }
    , println: function (_message, _id) {
        this.print(_message + "<br/>", _id);
        return this;
    }
    , h2: function (_message, _id) {
        this.print("<h2>" + _message + "</h2>\n", _id);
        return this;
    }
    , clear: function (_id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idOutput;
        }
        var element = document.getElementById(_id);
        if (element) {
            element.innerHTML = "";
        }
        return this;
    }
    , debug: function (_message, _id) {
        if (!this.verbose)
            return;
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idOutput;
        }
        var element = document.getElementById(_id);
        if (element) {
            element.innerHTML += "<pre>" + _message + "</pre>";
        }
        return this;
    }
    , debugln: function (_message, _id) {
        this.debug(_message + "<br/>", _id);
        return this;
    }
    , remove_commas: function (_str) {
        if (typeof _str == 'undefined' || !_str) {
            return "";
        }
        return _str.replace(/,/g, '');
    }
    , setVerbose: function (boolean) {
        this.verbose = boolean;
        return this;
    }
    , getVerbose: function () {
        return this.verbose;
    }
    , setMaximize: function (boolean) {
        this.maximize = boolean;
        return this;
    }
    , getMaximize: function () {
        return this.maximize;
    }
	, getGreedy: function() {
		return this.greedySolution;
	}
	, setGreedy: function(_greedy) {
		this.greedySolution = _greedy;
	}
    , setProblemId: function (_id) {
        this.problemID = this.remove_commas(_id);
        return this;
    }
    , getProblemId: function () {
        return this.remove_commas(this.problemID);
    }
    , setGetURL: function (_url) {
        this.getURL = _url;
        return this;
    }
    , getGetURL: function () {
        return this.getURL;
    }
    , setSendURL: function (_url) {
        this.sendURL = _url;
        return this;
    }
    , getSendURL: function () {
        return this.sendURL;
    }
    , setProxyURL: function (_url) {
        this.proxyURL = _url;
        return this;
    }
    , getProxyURL: function () {
        return this.proxyURL;
    }
    , setShowing: function (_val) {
        this.showing = (_val >= 0) ? _val : this.showing;
        return this;
    }
    , getShowing: function () {
        return this.showing;
    }
    , showPop: function (_aPop, _message, _numIndiv, _id) {
        if (typeof _message != 'undefined' && _message) {
            jsEOUtils.print("<h2>" + _message + "</h2>", _id);
        }
        if (typeof _aPop == 'undefined') {
            return this;
        }

        // Fixing the value of _numIndiv in case of problems
        _numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
        _numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

        var tb = "";
        tb += "<table class='table-striped tb_indiv table-hover table-bordered' cols='3' border='0'>\n<tr>\n" +
                "<th>#Indiv</th>\n " +
                "<th>Chromosome</th>\n " +
                "<th>Fitness</th>\n " +
                "</tr>\n ";
        for (var i = 0; i < _numIndiv; ++i) {
            var chr = _aPop.getAt(i).getChromosome().toString();
            tb += "<tr>\n " +
                    "<td>" + i + "</td>\n" +
                    "<td><span title='" + chr + "'>" +
                    ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" +
                    "<td>" + _aPop.getAt(i).getFitness() + "</td>\n" +
                    "</tr>\n ";

        }
        tb += "</table>\n";
        this.print(tb, _id);

        return this;
    },
    showPopMOTSP: function (_aPop, _message, _numIndiv, _id) {
        if (typeof _message != 'undefined' && _message) {
            jsEOUtils.print("<h2>" + _message + "</h2>", _id);
        }
        if (typeof _aPop == 'undefined') {
            return this;
        }

        // Fixing the value of _numIndiv in case of problems
        _numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
        _numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

        var tb = "";
        tb += "<table class='tb_indiv' cols='4' border='0'>\n<tr>\n" +
                "<th class='nInd'>#Indiv</th>\n " +
                "<th class='chr'>Chromosome</th>\n " +
                "<th class='fit'>Distance(km)</th>\n " +
                "<th class='fit'>Time(min)</th>\n " +
				"<th class='front' style='text-align: center'>Front</th>\n " +
                "</tr>\n ";
        for (var i = 0; i < _numIndiv; ++i) {
            var chr = _aPop.getAt(i).getChromosome().toString();
            tb += "<tr>\n " +
                    "<td class='nInd'>" + i + "</td>\n" +
                    "<td class='chr'><span title='" + chr + "'>" +
                    ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" +
                    "<td class='chr'>" + _aPop.getAt(i).getFitnessAt(0) + "</td>\n" +
                    "<td class='chr'>" + _aPop.getAt(i).getFitnessAt(1) + "</td>\n" +
					"<td class='chr'>" + ((_aPop.getAt(i).getRank() == 0)?"Front of Pareto":_aPop.getAt(i).getRank()) + "</td>\n" +
                    "</tr>\n ";

        }
        tb += "</table>\n";
        this.print(tb, _id);

        return this;
    }
    , showPopQueens: function (_aPop, _message, _numIndiv, _id) {
        if (typeof _message != 'undefined' && _message) {
            jsEOUtils.print("<h2>" + _message + "</h2>", _id);
        }
        if (typeof _aPop == 'undefined') {
            return this;
        }

        // Fixing the value of _numIndiv in case of problems
        _numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
        _numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

        var tb = "";
        tb += "<table class='tb_indiv' cols='3' border='0'>\n<tr>\n" +
                "<th class='nInd'>#Indiv</th>\n " +
                "<th class='chr'>Chromosome</th>\n " +
                "<th class='fit'>Fitness</th>\n " +
                "</tr>\n ";
        for (var i = 0; i < _numIndiv; ++i) {
            var chr = _aPop.getAt(i).show();
            tb += "<tr>\n " +
                    "<td class='nInd'>" + i + "</td>\n" +
                    "<td class='chr'><span title='" + chr + "'>" +
                    ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" +
                    "<td class='chr'>" + _aPop.getAt(i).getFitness() + "</td>\n" +
                    "</tr>\n ";

        }
        tb += "</table>\n";
        this.print(tb, _id);

        return this;
    }
    , averageFitness: function (_aPop) {
        var toRet = 0;
        if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
            return toRet;
        }
        for (var i = 0; i < _aPop.length(); ++i)
            toRet += _aPop.getAt(i).getFitness();
        return (toRet / _aPop.length());
    }
    , averageFitnessMO: function (_aPop, _objectives) {
        var toRet = "";

        if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
            return toRet;
        }

        var _aux = 0;
        for (var j = 0; j < _objectives; ++j) {
            if (j > 0)
                toRet += " | ";
            for (var i = 0; i < _aPop.length(); ++i) {
                _aux += _aPop.getAt(i).getFitnessAt(j);
            }
            toRet += (_aux / _aPop.length());
        }
        return toRet;
    }
    , bestFitnessMin: function (_aPop) {
        var toRet = 9999999;
        if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
            return toRet;
        }
        for (var i = 0; i < _aPop.length(); ++i) {
            if (_aPop.getAt(i).getFitness() < toRet)
                toRet = _aPop.getAt(i).getFitness();
        }
        return toRet;
    }
    , bestFitnessMinMO: function (_aPop, _objectives) {

        var toRet = "";

        if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
            return toRet;
        }

        for (var j = 0; j < _objectives; ++j) {
			var min = 9999999;
            if (j > 0)
                toRet += " | ";
            for (var i = 0; i < _aPop.length(); ++i) {
                if (_aPop.getAt(i).getFitnessAt(j) < min)
                    min = _aPop.getAt(i).getFitnessAt(j);
            }
            
            toRet += min;
        }
        
        return toRet;
    }
    , bestFitnessMax: function (_aPop) {
        var toRet = 0;
        if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
            return toRet;
        }
        for (i = 0; i < _aPop.length(); ++i) {
            if (_aPop.getAt(i).getFitness() > toRet)
                toRet = _aPop.getAt(i).getFitness();
        }
        return toRet;
    }
    , getInputParam: function (_param, _default) {
        var str = location.search.toLowerCase();
        var pos = str.indexOf((_param + "=").toLowerCase());
        return (pos < 0) ? _default : str.substring(str.indexOf("=", pos) + 1,
                (str.indexOf("&", pos) >= 0) ? str.indexOf("&", pos) : str.length);
    }
    , clearBestFitness: function () {
        bestFitness.length = 0;
        return this;
    }
    , clearWorstFitness: function () {
        worstFitness.length = 0;
        return this;
    }
    , clearAverageFitness: function () {
        averageFitness.length = 0;
        return this;
    }
    , clearStats: function () {
        this.clearAverageFitness();
        this.clearBestFitness();
        this.clearWorstFitness();
        return this;
    }
    , recordBestFitness: function (_value) {
        this.bestFit.push(_value);
        return this;
    }
    , recordWorstFitness: function (_value) {
        this.worstFit.push(_value);
        return this;
    }
    , recordAverageFitness: function (_value) {
        this.averageFit.push(_value);
        return this;
    }
    , recordStats: function (_worst, _average, _best) {
        this.recordWorstFitness(_worst);
        this.recordAverageFitness(_average);
        this.recordBestFitness(_best);
        return this;
    }
    , drawBestFitness: function (_id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Fitness');
            for (var i = 0; i < jsEOUtils.bestFit.length; ++i) {
                data.addRow([i, jsEOUtils.bestFit[i]]);
            }

            var options = {
                title: 'Evolution of Best Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }
    , drawWorstFitness: function (_id) {
        if (typeof _id == 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Fitness');
            for (var i = 0; i < jsEOUtils.worstFit.length; ++i) {
                data.addRow([i, jsEOUtils.worstFit[i]]);
            }

            var options = {
                title: 'Evolution of Worst Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }
    , drawGraphTSP: function (_aIndividual, _positions, _id) {

        if (typeof _id === 'undefined' || !_id) {
            _id = "jsEOTSP";
        }

        if (typeof _aIndividual == 'undefined') {
            return this;
        }

        var container = document.getElementById(_id);

        var chromosome = _aIndividual.getChromosome();

        var tam = chromosome.length;

        //Creamos un vector para insertar las ciudades
        var auxNodes = [];

        var x = 0, y = 0;

        //Insertamos las ciudades dentro del vector
        for (var i = 0; i < chromosome.length; ++i) {
            auxNodes.push({id: i, label: 'Ciudad ' + i, x: _positions[i].x * 5, y: _positions[i].y * 5});
        }

        //Creamos el conjunto de nodos a partir del vector con las ciudades
        var nodes = new vis.DataSet(auxNodes);

        //Creamos un vector para insertar los ejes
        var auxEdges = [];

        var count = 0;
        //Conectamos todas las ciudades entre si
        for (var i = 0; i < chromosome.length; ++i) {
            for (var j = 0; j < chromosome.length; ++j) {
                if (i != j && i < j)
                    auxEdges.push({from: i, to: j});
            }
        }

		//Dibujamos de color rojo el camino minimo obtenido con jsEO
        var a = 0;
        while (count < tam - 1) {
            if (auxEdges[a].from == chromosome[count] && auxEdges[a].to == chromosome[count + 1] ||
                    auxEdges[a].from == chromosome[count + 1] && auxEdges[a].to == chromosome[count]) {
                auxEdges[a].color = 'red';
                count++;
                a = 0;
            } else
                a++;
        }

        auxEdges[chromosome[tam - 1] - 1].color = 'red';
		
		
		//Ahora hacemos lo mismo pero con la solucion greedy. En esta caso la pintaremos de verde
		var a = 0, count = 0;
        while (count < tam - 1) {
            if (auxEdges[a].from == this.greedySolution[0][count] && auxEdges[a].to == this.greedySolution[0][count + 1] ||
                    auxEdges[a].from == this.greedySolution[0][count + 1] && auxEdges[a].to == this.greedySolution[0][count]) {
                auxEdges[a].color = 'green';
                count++;
                a = 0;
            } else
                a++;
        }

        auxEdges[this.greedySolution[0][tam - 1] - 1].color = 'green';

        var edges = new vis.DataSet(auxEdges);

        var data = {nodes: nodes, edges: edges};

        var options = {
            layout: {
                randomSeed: jsEOUtils.intRandom(1, 100000),
                improvedLayout: false
            }
        }
        console.log(options.layout.randomSeed);

        this.network = new vis.Network(container, data, options);

        return this;
    }
    , drawChessBoard: function (_aIndividual, _id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idGraphics;
        }

        if (typeof _aIndividual == 'undefined') {
            return this;
        }

        var chromosome = _aIndividual.getChromosome();

        var figQueen = "♔";


        jsEOUtils.print("<h2>Best Solutión</h2>", jsEOUtils.idGraphics);
        //Creation of the Chessboard
        var table = document.getElementById("tablero");
        table.className = "table-chess";
        for (f = 0; f < chromosome.length; ++f) {
            var fila = table.insertRow(table.rows.length);
            fila.className = "tr-chess";
            for (c = 0; c < chromosome.length; ++c) {
                var celda = fila.insertCell(fila.cells.length);
                celda.className = "td-chess";
            }
        }

        for (c = 0; c < chromosome.length; ++c) {
            table.rows[chromosome[c].getX()].cells[chromosome[c].getY()].innerHTML = "<span class=negras>" + figQueen + "</span>";
        }


        return this;
    }
    , drawAverageFitness: function (_id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Fitness');
            for (var i = 0; i < jsEOUtils.averageFit.length; ++i) {
                data.addRow([i, jsEOUtils.averageFit[i]]);
            }

            var options = {
                title: 'Evolution of Average Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }
	, drawEvolutionFitness: function(_aPopInitial, _aPopFinal, _id){
		if(typeof _id === 'undefined' || !_id){
			_id = "lines";
		}
		
		var ctx = document.getElementById(_id).getContext("2d");
		
		var fitnessInit = [], fitnessFin = [], fitnessGreedy = [];
		
		for(var i = 0; i < _aPopInitial.length; ++i){
			fitnessInit.push(_aPopInitial[i]);
			fitnessFin.push(_aPopFinal[i]);
			fitnessGreedy.push(this.greedySolution[1]);
		}
		
		var blue = "rgba(151,187,205,1)";
		var red = "rgba(255, 99, 132, 1)";
		var green = "rgb(75, 192, 192)";
		
		var data = {
				labels: _aPopInitial.map(function(e, i){
					return "Individual " + i;
				}),
				datasets: [
					{
						label: "Evolution Fitness Population Initial",
						fill: false,
						backgroundColor: red,
						borderColor: red,
						pointBackgroundColor: red,
						pointHoverBackgroundColor: red,
						pointHoverBorderColor: red,
						pointRadius: 5,
						data: fitnessInit
					},
					{
						label: "Evolution Fitness Population Final",
						fill: false,
						backgroundColor: blue,
						borderColor: blue,
						pointBackgroundColor: blue,
						pointHoverBackgroundColor: blue,
						pointHoverBorderColor: blue,
						pointRadius: 5,
						data: fitnessFin
					},
					{
						label: "Solution Algorithm Greedy",
						fill: false,
						backgroundColor: green,
						borderColor: green,
						pointBackgroundColor: green,
						pointHoverBackgroundColor: green,
						pointHoverBorderColor: green,
						pointRadius: 5,
						data: fitnessGreedy
					}
				]
			};
		
		var myLineChart = new Chart(ctx, {
					type: 'line',
					data: data,
					options: {
						pointDot: true
						, scaleSteps: 10
						, scaleShowLabels: true
						, responsive: true
						, animation: false
					}
        });
		this.chart = myLineChart;
        return this;
		
	}
	, drawGreedySolution: function(_message, _id){
		
		if (typeof _message != 'undefined' && _message) {
            jsEOUtils.print("<h2>" + _message + "</h2>", _id);
        }
		
		if(typeof _id === 'undefined' || !_id){
			_id = this.idOutput;
		}
		
		
		
		var span = "<ul>" +
   					"<li><span style='color: red'>" + "Camino minimo Algoritmo Genetico jsEOTSP" + "</li>"+
					"<li><span style='color: green'>" + "Camino minimo Algoritmo Greedy" + "</li>"+
					"</ul>";
		this.print(span, "legend");
		var tb = "";
        tb += "<table class='tb_indiv table-striped table-hover table-bordered' cols='3' border='0'>\n<tr>\n" +
                "<th>Indiv</th>\n " +
                "<th>Chromosome</th>\n " +
                "<th>Fitness</th>\n " +
                "</tr>\n ";
        var chr = this.greedySolution[0].toString();
        tb += "<tr>\n " +
                "<td>" + 'Greedy' + "</td>\n" +
                "<td><span title='" + chr + "'>" +
                ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" +
                "<td>" + this.greedySolution[1] + "</td>\n" +
                "</tr>\n ";
        tb += "</table>\n";
		
        this.print(tb, _id);

        return this;
	}
	, drawEvolutionFitnessMO: function(_aPop, _id){
		if(typeof _id === 'undefined' || !_id){
			_id = "pie";
		}
		
		var ctx = document.getElementById(_id);
		
		var fronts = new Array(5);
		
		for(var i = 0; i < 5; ++i){
			fronts[i] = 0;
			for(var j = 0; j < _aPop.pop.length; ++j){
				if(_aPop.getAt(j).getRank() == i)
					++fronts[i];
			}
		}
		
		var data = {
				labels: ["Pareto Front", "Front One", "Front Two", "Front Three", "Front Four"],
				datasets: [
					{
						label: "Fronts",
						data: fronts,
						backgroundColor: ["#ff6384", "#ff9f40", "#ffcd56", "#4bc0c0", "#36a2eb"]
					}]
		};
		
		var myPieChart = new Chart(ctx, {
				type: 'pie',
				data: data,
				options: {
					title: {
						display: true,
						fontsize: 14,
						text: 'Fronts of individuals TSP MultiObjective'
					}
					, legend: {
						display: true,
						position: 'bottom',
						labels: {
							generateLabels: function(chart) {
								var data = chart.data;
								if (data.labels.length && data.datasets.length) {
									return data.labels.map(function(label, i) {
										var meta = chart.getDatasetMeta(0);
										var ds = data.datasets[0];
										var arc = meta.data[i];
										var custom = arc && arc.custom || {};
										var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
										var arcOpts = chart.options.elements.arc;
										var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
										var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
										var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

										// We get the value of the current label
										var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];

										return {
											// Instead of `text: label,`
											// We add the value to the string
											text: label,
											fillStyle: fill,
											strokeStyle: stroke,
											lineWidth: bw,
											hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
											index: i
										};
									});
								} else {
									return [];
								}
							}
						}
					}
				}
			});

		this.chart = myPieChart;
        return this;
		
	}
    , drawAverageFitness2: function (_id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idChart;
        }
        var ctx = document.getElementById(_id).getContext("2d");
        var data = {
            labels: jsEOUtils.averageFit.map(function (e, i) {
                return i;
            }),
            datasets: [
                {
                    label: "Average Fitness",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: jsEOUtils.averageFit
                }
            ]
        };
        var myLineChart = new Chart(ctx).Line(data
                , {
                    pointDot: false
                    , scaleSteps: 10
                    , scaleShowLabels: true
                    , responsive: true
                    , animation: false
                }
        );
        return this;
    }

    , drawStats: function (_message, _id) {
        if (typeof _id === 'undefined' || !_id) {
            _id = this.idGraphics;
        }
        this.h2(_message, _id);
        google.load("visualization", "1", {packages: ["corechart"]});
        google.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Generation');
            data.addColumn('number', 'Worst Fitness');
            data.addColumn('number', 'Average Fitness');
            data.addColumn('number', 'Best Fitness');
            for (var i = 0; i < jsEOUtils.bestFit.length; ++i) {
                data.addRow([i, jsEOUtils.worstFit[i],
                    jsEOUtils.averageFit[i],
                    jsEOUtils.bestFit[i]]);
            }

            var options = {
                title: 'Evolution of Fitness'
            };
            var chart = new google.visualization.LineChart(document.getElementById(_id));
            chart.draw(data, options);
        });
        return this;
    }

    , exists: function (array1, array2) {

        var result = -1;

        for (var i = 0; i < array1.length; ++i) {
            for (var j = 0; j < array2.length; ++j) {
                if (array1[i].x == array2[j].x && array1[i].y == array2[j].y) {
                    result = j;
                }
            }
        }
        return result;
    }

    /**
     * Creates a random integer number between min and max, both of them included
     * @param {type} min Lowest value
     * @param {type} max Greatest value
     * @returns {Number} Random integer number in the range [min,max]
     */
    , intRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Creates a random integer number between min and max, both of them included
     * @param {type} min Lowest value
     * @param {type} max Greatest value
     * @returns {Number} Random integer number in the range [min,max]
     */
    , intRandom2: function (min, max) {
        return Math.round(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Creates a random number between [min, max)
     * @param {type} min Lowest value
     * @param {type} max Greatest value
     * @returns {Number} Random number in the range [min,max)
     */
    , random: function (min, max) {
        return (Math.random() * (max - min)) + min;
    }

    /**
     * Computes euclidean distance between two arrays
     * @param {array of floats} a First array
     * @param {array of floats} b Second array
     * @throws {RangeError} Error if lengths of a and b are differents
     * @returns {Number} The euclidean distance
     */
    , distance: function (a, b) {
        if (typeof a === 'undefined')
            throw new TypeError("Distance can't be computed: "
                    + "first parameter doen't exist ");
        if (typeof b === 'undefined')
            throw new TypeError("Distance can't be computed: "
                    + "second parameter doen't exist ");
        if (a.length != b.length)
            throw new RangeError("Distance can't be computed: "
                    + "points have different lengths; "
                    + a.length + " vs " + b.length);

        // Turning parameters into array to apply .map
        a = (a.length) ? a : [a];
        b = (b.length) ? b : [b];
        return Math.sqrt(
                a.map(function (e, i) {
                    return e - b[i];
                })
                .map(function (e) {
                    return Math.pow(e, 2);
                })
                .reduce(function (a, b) {
                    return a + b;
                }, 0)
                );
    }
};
