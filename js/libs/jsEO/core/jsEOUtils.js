/* 
 * Copyright (C) 2013 vrivas
 *
 * Víctor M. Rivas Santos: vrivas@ujaen.es - http://vrivas.es
 * Javier Guzmń García: jgg00045@red.ujaen.es
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
	verbose: false,
	bestFit: [],
	worstFit: [],
	averageFit: [],
	positionsTSP: [],
	greedySolution: [],
	idOutput: "jsEOConsole",
	idGraphics: "jsEOGraphics",
	idChart: "myChart",
	problemID: null,
	getURL: "../receiving",
	sendURL: "../sending",
	proxyURL: "",
	showing: 3,
	maximize: true,
	network: 0,
	chart: 0,
	setOutput: function(_id) {
		if (typeof _id != 'undefined') {
			this.idOutput = _id;
		}
		return this;
	},
	setGraphics: function(_id) {
		if (typeof _id != 'undefined') {
			this.idGraphics = _id;
		}
		return this;
	},
	print: function(_message, _id) {
		if (typeof _id == 'undefined' || !_id) {
			_id = this.idOutput;
		}
		var element = document.getElementById(_id);
		if (element) {
			element.innerHTML += _message;
		}
		return this;
	},
	replace: function(_message, _id) {
		this.clear(_id);
		this.print(_message, _id);
		return this;
	},
	println: function(_message, _id) {
		this.print(_message + "<br/>", _id);
		return this;
	},
	h2: function(_message, _id) {
		this.print("<h2>" + _message + "</h2>\n", _id);
		return this;
	},
	clear: function(_id) {
		if (typeof _id == 'undefined' || !_id) {
			_id = this.idOutput;
		}
		var element = document.getElementById(_id);
		if (element) {
			element.innerHTML = "";
		}
		return this;
	},
	debug: function(_message, _id) {
		if (!this.verbose) return;
		if (typeof _id == 'undefined' || !_id) {
			_id = this.idOutput;
		}
		var element = document.getElementById(_id);
		if (element) {
			element.innerHTML += "<pre>" + _message + "</pre>";
		}
		return this;
	},
	debugln: function(_message, _id) {
		this.debug(_message + "<br/>", _id);
		return this;
	},
	remove_commas: function(_str) {
		if (typeof _str == 'undefined' || !_str) {
			return "";
		}
		return _str.replace(/,/g, '');
	},
	setVerbose: function(boolean) {
		this.verbose = boolean;
		return this;
	},
	getVerbose: function() {
		return this.verbose;
	},
	setMaximize: function(boolean) {
		this.maximize = boolean;
		return this;
	},
	getMaximize: function() {
		return this.maximize;
	},
	getGreedy: function() {
		return this.greedySolution;
	},
	setGreedy: function(_greedy) {
		this.greedySolution = _greedy;
	},
	setProblemId: function(_id) {
		this.problemID = this.remove_commas(_id);
		return this;
	},
	getProblemId: function() {
		return this.remove_commas(this.problemID);
	},
	setGetURL: function(_url) {
		this.getURL = _url;
		return this;
	},
	getGetURL: function() {
		return this.getURL;
	},
	setSendURL: function(_url) {
		this.sendURL = _url;
		return this;
	},
	getSendURL: function() {
		return this.sendURL;
	},
	setProxyURL: function(_url) {
		this.proxyURL = _url;
		return this;
	},
	getProxyURL: function() {
		return this.proxyURL;
	},
	setShowing: function(_val) {
		this.showing = (_val >= 0) ? _val : this.showing;
		return this;
	},
	getShowing: function() {
		return this.showing;
	},
	showPop: function(_aPop, _message, _numIndiv, _id) {

		if (typeof _aPop == 'undefined') {
			return this;
		}

		// Fixing the value of _numIndiv in case of problems
		_numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
		_numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

		var tb = "";
		tb += "<div class='card'>" + "<div class='card-header text-center'>" + "<h2>" + _message + "</h2>" + "</div>" + "<div class='card-block'>";
		tb += "<table class='tb_indiv' cols='3' border='0'>\n<tr>\n" + "<th>Chromosome</th>\n " + "<th>Fitness</th>\n " + "</tr>\n ";
		for (var i = 0; i < _numIndiv; ++i) {
			var chr = _aPop.getAt(i).getChromosome().toString();
			tb += "<tr>\n " + "<td><span title='" + chr + "'>" + ((chr.length <= 10) ? chr : (chr.substr(0, 10) + "...")) + "</span></td>\n" + "<td>" + _aPop.getAt(i).getFitness() + "</td>\n" + "</tr>\n ";

		}
		tb += "</table>\n";
		this.print(tb, _id);

		return this;
	},
	showPopMOTSP: function(_aPop, _message, _numIndiv, _id) {

		if (typeof _aPop == 'undefined') {
			return this;
		}

		// Fixing the value of _numIndiv in case of problems
		_numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
		_numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

		var tb = "";
		tb += "<div class='card'>" + "<div class='card-header text-center'>" + "<h2>" + _message + "</h2>" + "</div>" + "<div class='card-block'>";
		tb += "<table class='tb_indiv' cols='4' border='0'>\n<tr>\n" + "<th class='chr'>Chromosome</th>\n " + "<th class='fit'>Distance(km)</th>\n " + "<th class='fit'>Time(min)</th>\n " + "<th class='front' style='text-align: center'>Front</th>\n " + "</tr>\n ";
		for (var i = 0; i < _numIndiv; ++i) {
			var chr = _aPop.getAt(i).getChromosome().toString();
			tb += "<tr>\n " + "<td class='chr'><span title='" + chr + "'>" + ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" + "<td class='chr'>" + _aPop.getAt(i).getFitnessAt(0) + "</td>\n" + "<td class='chr'>" + _aPop.getAt(i).getFitnessAt(1) + "</td>\n" + "<td class='chr'>" + ((_aPop.getAt(i).getRank() == 0) ? "Front of Pareto" : _aPop.getAt(i).getRank()) + "</td>\n" + "</tr>\n ";
		}
		tb += "</table>\n";
		tb += "</div>" + "</div>";
		this.print(tb, _id);

		return this;
	},
	showPopQueens: function(_aPop, _message, _numIndiv, _id) {

		if (typeof _aPop == 'undefined') {
			return this;
		}

		// Fixing the value of _numIndiv in case of problems
		_numIndiv = (typeof _numIndiv == 'undefined') ? this.showing : _numIndiv;
		_numIndiv = (_numIndiv < 0 || _numIndiv > _aPop.length()) ? _aPop.length() : _numIndiv;

		var tb = "";
		tb += "<div class='card'>" + "<div class='card-header text-center'>" + "<h2>" + _message + "</h2>" + "</div>" + "<div class='card-block'>";
		tb += "<table class='tb_indiv' cols='3' border='0'>\n<tr>\n" + "<th class='chr'>Chromosome</th>\n " + "<th class='fit'>Fitness</th>\n " + "</tr>\n ";
		for (var i = 0; i < _numIndiv; ++i) {
			var chr = _aPop.getAt(i).show();
			tb += "<tr>\n " + "<td class='chr'><span title='" + chr + "'>" + ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" + "<td class='chr'>" + _aPop.getAt(i).getFitness() + "</td>\n" + "</tr>\n ";

		}
		tb += "</table>\n";
		tb += "</div>" + "</div>";
		this.print(tb, _id);

		return this;
	},
	averageFitness: function(_aPop) {

		//Function to calculate the average fitness of a population
		var toRet = 0;
		if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
			return toRet;
		}
		for (var i = 0; i < _aPop.length(); ++i)
		toRet += _aPop.getAt(i).getFitness();
		return (toRet / _aPop.length());

	},
	averageFitnessMO: function(_aPop, _objectives) {

		//Function to calculate the average fitness of a population multiobjective
		var toRet = "";

		if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
			return toRet;
		}

		var _aux = 0;
		for (var j = 0; j < _objectives; ++j) {
			if (j > 0) toRet += " | ";
			for (var i = 0; i < _aPop.length(); ++i) {
				_aux += _aPop.getAt(i).getFitnessAt(j);
			}
			toRet += (_aux / _aPop.length());
		}
		return toRet;

	},
	bestFitnessMin: function(_aPop) {

		//Function to calculate the best fitness of one population with the criterion of minimization
		var toRet = 9999999;
		if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
			return toRet;
		}
		for (var i = 0; i < _aPop.length(); ++i) {
			if (_aPop.getAt(i).getFitness() < toRet) toRet = _aPop.getAt(i).getFitness();
		}
		return toRet;

	},
	bestFitnessMinMO: function(_aPop, _objectives) {

		//Function to calculate the best fitness of one population multiobjective with the criterion of minimization
		var toRet = "";

		if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
			return toRet;
		}

		for (var j = 0; j < _objectives; ++j) {
			var min = 9999999;
			if (j > 0) toRet += " | ";
			for (var i = 0; i < _aPop.length(); ++i) {
				if (_aPop.getAt(i).getFitnessAt(j) < min) min = _aPop.getAt(i).getFitnessAt(j);
			}

			toRet += min;
		}

		return toRet;
	},
	bestFitnessMax: function(_aPop) {

		//Function to calculate the best fitness with the criterion of maximization
		var toRet = 0;
		if (typeof _aPop == 'undefined' || _aPop.length() <= 0) {
			return toRet;
		}
		for (i = 0; i < _aPop.length(); ++i) {
			if (_aPop.getAt(i).getFitness() > toRet) toRet = _aPop.getAt(i).getFitness();
		}
		return toRet;
	},
	getInputParam: function(_param, _default) {
		var str = location.search.toLowerCase();
		var pos = str.indexOf((_param + "=").toLowerCase());
		return (pos < 0) ? _default : str.substring(str.indexOf("=", pos) + 1, (str.indexOf("&", pos) >= 0) ? str.indexOf("&", pos) : str.length);
	},
	clearBestFitness: function() {
		bestFitness.length = 0;
		return this;
	},
	clearWorstFitness: function() {
		worstFitness.length = 0;
		return this;
	},
	clearAverageFitness: function() {
		averageFitness.length = 0;
		return this;
	},
	clearStats: function() {
		this.clearAverageFitness();
		this.clearBestFitness();
		this.clearWorstFitness();
		return this;
	},
	recordBestFitness: function(_value) {
		this.bestFit.push(_value);
		return this;
	},
	recordWorstFitness: function(_value) {
		this.worstFit.push(_value);
		return this;
	},
	recordAverageFitness: function(_value) {
		this.averageFit.push(_value);
		return this;
	},
	recordStats: function(_worst, _average, _best) {
		this.recordWorstFitness(_worst);
		this.recordAverageFitness(_average);
		this.recordBestFitness(_best);
		return this;
	},
	drawBestFitness: function(_id) {
		if (typeof _id == 'undefined' || !_id) {
			_id = this.idGraphics;
		}
		google.load("visualization", "1", {
			packages: ["corechart"]
		});
		google.setOnLoadCallback(function() {
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
	},
	drawWorstFitness: function(_id) {
		if (typeof _id == 'undefined' || !_id) {
			_id = this.idGraphics;
		}
		google.load("visualization", "1", {
			packages: ["corechart"]
		});
		google.setOnLoadCallback(function() {
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
	},
	drawGraphTSP: function(_aIndividual, _positions, _id) {

		if (typeof _id === 'undefined' || !_id) {
			_id = "jsEOTSP";
		}

		if (typeof _aIndividual == 'undefined') {
			return this;
		}

		var container = document.getElementById(_id);

		var chromosome = _aIndividual.getChromosome();

		var tam = chromosome.length;

		//We create a vector to insert the cities
		var auxNodes = [];

		var x = 0,
			y = 0;

		//We insert the cities into the vector
		for (var i = 0; i < chromosome.length; ++i) {
			auxNodes.push({
				id: i,
				label: 'Ciudad ' + i,
				x: _positions[i].x * 5,
				y: _positions[i].y * 5
			});
		}

		//We create the set of nodes from the vector with the cities
		var nodes = new vis.DataSet(auxNodes);

		//We create a vector to insert the axes
		var auxEdges = [];

		var count = 0;
		//We connect all the cities with each other
		for (var i = 0; i < chromosome.length; ++i) {
			for (var j = 0; j < chromosome.length; ++j) {
				if (i != j && i < j) auxEdges.push({
					from: i,
					to: j
				});
			}
		}

		//We draw red color the minimum path obtained with jsEO
		var a = 0;
		while (count < tam - 1) {
			if (auxEdges[a].from == chromosome[count] && auxEdges[a].to == chromosome[count + 1] || auxEdges[a].from == chromosome[count + 1] && auxEdges[a].to == chromosome[count]) {
				auxEdges[a].color = 'red';
				count++;
				a = 0;
			} else a++;
		}

		auxEdges[chromosome[tam - 1] - 1].color = 'red';

		if (this.greedySolution.length != 0) {
			//Now we do the same but with greedy solution.
			//In this case we will paint it green.
			//We will only paint it in case there is a greedy solution available
			var a = 0,
				count = 0;
			while (count < tam - 1) {
				if (auxEdges[a].from == this.greedySolution[0][count] && auxEdges[a].to == this.greedySolution[0][count + 1] || auxEdges[a].from == this.greedySolution[0][count + 1] && auxEdges[a].to == this.greedySolution[0][count]) {
					auxEdges[a].color = 'green';
					count++;
					a = 0;
				} else a++;
			}

			auxEdges[this.greedySolution[0][tam - 1] - 1].color = 'green';
		}

		var edges = new vis.DataSet(auxEdges);

		//We add the axes and the nodes
		var data = {
			nodes: nodes,
			edges: edges
		};

		var options = {
			layout: {
				randomSeed: jsEOUtils.intRandom(1, 100000),
				improvedLayout: false
			}
		}

		//And finally we create the graph
		this.network = new vis.Network(container, data, options);

		return this;
	},
	drawChessBoard: function(_aIndividual, _id) {
		if (typeof _id === 'undefined' || !_id) {
			_id = this.idGraphics;
		}

		if (typeof _aIndividual == 'undefined') {
			return this;
		}

		var chromosome = _aIndividual.getChromosome();

		var figQueen = "♔";

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
	},
	drawAverageFitness: function(_id) {
		if (typeof _id === 'undefined' || !_id) {
			_id = this.idGraphics;
		}
		google.load("visualization", "1", {
			packages: ["corechart"]
		});
		google.setOnLoadCallback(function() {
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
	},
	drawEvolutionFitness: function(_aPopInitial, _aPopFinal, _id) {
		if (typeof _id === 'undefined' || !_id) {
			_id = "lines";
		}

		//Creating graph for representing solutions with jsEO
		var ctx = document.getElementById(_id).getContext("2d");

		var fitnessInit = [],
			fitnessFin = [],
			fitnessGreedy = [];

		for (var i = 0; i < _aPopInitial.length; ++i) {
			fitnessInit.push(_aPopInitial[i]);
			fitnessFin.push(_aPopFinal[i]);
			fitnessGreedy.push(this.greedySolution[1]);
		}

		var blue = "rgba(151,187,205,1)";
		var red = "rgba(255, 99, 132, 1)";
		var green = "rgb(75, 192, 192)";

		var data = {
			labels: _aPopInitial.map(function(e, i) {
				return "Individual " + i;
			}),
			datasets: [{
				label: "Evolution Fitness Population Initial",
				fill: false,
				backgroundColor: red,
				borderColor: red,
				pointBackgroundColor: red,
				pointHoverBackgroundColor: red,
				pointHoverBorderColor: red,
				pointRadius: 5,
				data: fitnessInit
			}, {
				label: "Evolution Fitness Population Final",
				fill: false,
				backgroundColor: blue,
				borderColor: blue,
				pointBackgroundColor: blue,
				pointHoverBackgroundColor: blue,
				pointHoverBorderColor: blue,
				pointRadius: 5,
				data: fitnessFin
			}, {
				label: "Solution Algorithm Greedy",
				fill: false,
				backgroundColor: green,
				borderColor: green,
				pointBackgroundColor: green,
				pointHoverBackgroundColor: green,
				pointHoverBorderColor: green,
				pointRadius: 5,
				data: fitnessGreedy
			}]
		};

		var myLineChart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				pointDot: true,
				scaleSteps: 10,
				scaleShowLabels: true,
				responsive: true,
				animation: false
			}
		});
		this.chart = myLineChart;
		return this;

	},
	showDescription: function(_problem, _id) {

		//Function that shows the description of each problem. To view a new problem, add the description here
		var p = "";

		switch (_problem) {
		case 'TSP':
			p += "<p>" + "We are trying to solve the TSP(Travelling Salesman Problem)," + "where we have to find a way that goes through all the cities" + "without going through any of them again and return to the city where it started." + "In this case, the best path will be the one with the least distance. (Minimization problem)";
			p += "</p>";
			break;
		case 'NQueens':
			p += "<p>" + "We are trying to solve the NQueens problem." + "This tries to place on a board of size NxN, N-queens so that they do not eat each other," + "that is to say, neither horizontally, nor vertically nor diagonally." + "In this case, the best solution will be the one in which fewer queens will eat each other. (Maximization problem)";
			p += "</p>";
			break;
		case 'TSP_MO':
			p += "<p>" + "In this case we will solve the TSP problem," + "but using a multiobjective algorithm. In this case the multiobjective algorithm" + "will have 2 parameters the main one, which will remain the distance and the time," + "so that not only is it sought to travel all the cities and return to the origin in the" + "minimum possible time, but also, Do it also in the shortest possible time. (Minimization problem)";
			p += "</p>";
			break;
		case 'Bit':
			p += "<p>" + "We are trying to find 256-length bit-strings with" + "the maximum number of '0000' and/or '1111' sequences. (Global" + "maximum is 253, corresponding to the string composed by only '1s'" + "or only '0s').";
			p += "</p>";
			break;
		case 'Float':
			p += "<p>" + "We are trying to solve the following equation:" + "<br>";
			p += "(x<sub>0</sub> -7.156) + (x<sub>1</sub> +2.229) +" + "(x<sub>2</sub> -5.535) + (x<sub>3</sub> -4.618) +" + "(x<sub>4</sub> +6.902) + (x<sub>5</sub> -3.912) +" + "(x<sub>6</sub> +7.246) + (x<sub>7</sub> -9.204) +" + "(x<sub>8</sub> +8.919) + (x<sub>9</sub> +5.979) +" + "(x<sub>10</sub> +9.348) + (x<sub>11</sub> +9.444) +" + "(x<sub>12</sub> +8.353) + (x<sub>13</sub> +5.018) +" + "(x<sub>14</sub> +4.606) + (x<sub>15</sub> +0.961) +" + "(x<sub>16</sub> +7.225) + (x<sub>17</sub> +1.903) +" + "(x<sub>18</sub> +1.452) + (x<sub>19</sub> -5.583) +" + "(x<sub>20</sub> -9.210) + (x<sub>21</sub> +4.003) + (x<sub>22</sub> -2.308) + (x<sub>23</sub> -9.555) + (x<sub>24</sub> +5.903) + (x<sub>25</sub> -3.676) + (x<sub>26</sub> -9.837) + (x<sub>27</sub> -5.272) + (x<sub>28</sub> +3.882) + (x<sub>29</sub> -5.365) + (x<sub>30</sub> +8.509) + (x<sub>31</sub> -8.524) + (x<sub>32</sub> +5.927) + (x<sub>33</sub> -5.617) + (x<sub>34</sub> +8.877) + (x<sub>35</sub> +6.647) + (x<sub>36</sub> +6.081) + (x<sub>37</sub> +0.921) + (x<sub>38</sub> +5.566) + (x<sub>39</sub> -7.609) + (x<sub>40</sub> -0.804) + (x<sub>41</sub> -8.849) + (x<sub>42</sub> +6.493) + (x<sub>43</sub> -3.435) + (x<sub>44</sub> +9.561) + (x<sub>45</sub> +1.836) + (x<sub>46</sub> -8.239) + (x<sub>47</sub> +4.165) + (x<sub>48</sub> -0.434) + (x<sub>49</sub> +5.654) + (x<sub>50</sub> -6.245) + (x<sub>51</sub> -8.889) + (x<sub>52</sub> -2.784) + (x<sub>53</sub> +2.473) + (x<sub>54</sub> +1.843) + (x<sub>55</sub> -4.917) + (x<sub>56</sub> -3.704) + (x<sub>57</sub> +0.405) + (x<sub>58</sub> +5.132) + (x<sub>59</sub> +2.956) + (x<sub>60</sub> -6.344) + (x<sub>61</sub> +8.843) + (x<sub>62</sub> +2.651) + (x<sub>63</sub> -0.127) + (x<sub>64</sub> -5.662) + (x<sub>65</sub> -5.994) + (x<sub>66</sub> -8.043) + (x<sub>67</sub> +1.111) + (x<sub>68</sub> -2.832) + (x<sub>69</sub> -3.571) + (x<sub>70</sub> -5.677) + (x<sub>71</sub> -5.370) + (x<sub>72</sub> -9.045) + (x<sub>73</sub> -0.591) + (x<sub>74</sub> +7.523) + (x<sub>75</sub> -0.441) + (x<sub>76</sub> +4.587) + (x<sub>77</sub> +7.550) + (x<sub>78</sub> -4.303) + (x<sub>79</sub> -6.137) + (x<sub>80</sub> +3.080) + (x<sub>81</sub> +5.412) + (x<sub>82</sub> +9.824) + (x<sub>83</sub> +3.046) + (x<sub>84</sub> +6.025) + (x<sub>85</sub> -2.371) + (x<sub>86</sub> +2.083) + (x<sub>87</sub> -9.011) + (x<sub>88</sub> +4.910) + (x<sub>89</sub> +3.966) + (x<sub>90</sub> -7.329) + (x<sub>91</sub> -6.136) + (x<sub>92</sub> -8.572) + (x<sub>93</sub> -4.568) + (x<sub>94</sub> +8.636) + (x<sub>95</sub> +8.604) + (x<sub>96</sub> +0.157) + (x<sub>97</sub> -9.133) + (x<sub>98</sub> +0.860) + (x<sub>99</sub> +8.441) + (x<sub>100</sub> -4.106) + (x<sub>101</sub> +7.366) + (x<sub>102</sub> -2.493) + (x<sub>103</sub> +9.860) + (x<sub>104</sub> -1.570) + (x<sub>105</sub> -7.574) +" + "(x<sub>106</sub> -9.881) + (x<sub>107</sub> -2.417) +" + "(x<sub>108</sub> -4.276) + (x<sub>109</sub> +0.906) +" + "(x<sub>110</sub> -8.008) + (x<sub>111</sub> +7.272) +" + "(x<sub>112</sub> -9.818) + (x<sub>113</sub> -4.328) +" + "(x<sub>114</sub> -2.490) + (x<sub>115</sub> +9.182) +" + "(x<sub>116</sub> -7.859) + (x<sub>117</sub> +7.229) +" + "(x<sub>118</sub> +5.884) + (x<sub>119</sub> -9.712) +" + "(x<sub>120</sub> -0.302) + (x<sub>121</sub> +4.695) +" + "(x<sub>122</sub> -6.982) + (x<sub>123</sub> -2.770) +" + "(x<sub>124</sub> +4.645) + (x<sub>125</sub> +8.147) +" + "(x<sub>126</sub> +1.214) + (x<sub>127</sub> -2.052) = 0";
			p += "</p>";
			break;
		}
		this.print(p, _id);
	},
	showTime: function(_time, _id) {

		//Function that shows the time of execution of the problem
		this.print(_time, _id);
	},
	showLegend: function(_id) {

		//Function that shows the legend for the graph
		var span = "<ul class='list-group'>" + "<li class='list-group-item list-group-item-danger'>" + "Camino minimo Algoritmo Genetico jsEOTSP" + "</li>" + "<li class='list-group-item list-group-item-success'>" + "Camino minimo Algoritmo Greedy" + "</li>" + "<li class='list-group-item list-group-item-info'>" + "Caminos no incluidos en la solución óptima" + "</li>" + "</ul>";
		this.print(span, "legend");

	},
	showLegendMO: function(_id) {

		//Function that shows the legend for the graph of the multiobjective problem
		var span = "<ul class='list-group'>" + "<li class='list-group-item list-group-item-danger'>" + "Camino minimo Algoritmo Genetico jsEOTSP" + "</li>" + "<li class='list-group-item list-group-item-info'>" + "Caminos no incluidos en la solución óptima" + "</li>" + "</ul>";
		this.print(span, "legend");

	},
	drawGreedySolution: function(_message, _id) {

		if (typeof _id === 'undefined' || !_id) {
			_id = this.idOutput;
		}

		//Function that shows us what would be the greedy solution to the TSP
		var tb = "";
		tb += "<div class='card'>" + "<div class='card-header text-center'>" + "<h2>" + _message + "</h2>" + "</div>" + "<div class='card-block'>";
		tb += "<table class='tb_indiv' cols='3' border='0'>\n<tr>\n" + "<th>Chromosome</th>\n " + "<th>Fitness</th>\n " + "</tr>\n ";
		var chr = this.greedySolution[0].toString();
		tb += "<tr>\n " + "<td><span title='" + chr + "'>" + ((chr.length <= 50) ? chr : (chr.substr(0) + "...")) + "</span></td>\n" + "<td>" + this.greedySolution[1] + "</td>\n" + "</tr>\n ";
		tb += "</table>\n";
		tb += "</div>" + "</div>";

		this.print(tb, _id);

		return this;
	},
	drawEvolutionFitnessMO: function(_aPop, _id) {
		if (typeof _id === 'undefined' || !_id) {
			_id = "lines";
		}

		//Creating graph for representing solutions with jsEO for multiobjective problems
		var ctx = document.getElementById(_id);

		var fronts = new Array(5);

		for (var i = 0; i < 5; ++i) {
			fronts[i] = 0;
			for (var j = 0; j < _aPop.pop.length; ++j) {
				if (_aPop.getAt(j).getRank() == i)++fronts[i];
			}
		}

		var data = {
			labels: ["Pareto Front", "Front One", "Front Two", "Front Three", "Front Four"],
			datasets: [{
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
				},
				legend: {
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

	},
	drawAverageFitness2: function(_id) {
		if (typeof _id === 'undefined' || !_id) {
			_id = this.idChart;
		}
		var ctx = document.getElementById(_id).getContext("2d");
		var data = {
			labels: jsEOUtils.averageFit.map(function(e, i) {
				return i;
			}),
			datasets: [{
				label: "Average Fitness",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: jsEOUtils.averageFit
			}]
		};
		var myLineChart = new Chart(ctx).Line(data, {
			pointDot: false,
			scaleSteps: 10,
			scaleShowLabels: true,
			responsive: true,
			animation: false
		});
		return this;
	}

	,
	drawStats: function(_message, _id) {
		if (typeof _id === 'undefined' || !_id) {
			_id = this.idGraphics;
		}
		this.h2(_message, _id);
		google.load("visualization", "1", {
			packages: ["corechart"]
		});
		google.setOnLoadCallback(function() {
			var data = new google.visualization.DataTable();
			data.addColumn('number', 'Generation');
			data.addColumn('number', 'Worst Fitness');
			data.addColumn('number', 'Average Fitness');
			data.addColumn('number', 'Best Fitness');
			for (var i = 0; i < jsEOUtils.bestFit.length; ++i) {
				data.addRow([i, jsEOUtils.worstFit[i], jsEOUtils.averageFit[i], jsEOUtils.bestFit[i]]);
			}

			var options = {
				title: 'Evolution of Fitness'
			};
			var chart = new google.visualization.LineChart(document.getElementById(_id));
			chart.draw(data, options);
		});
		return this;
	}

	,
	exists: function(array1, array2) {

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
	 */,
	intRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Creates a random integer number between min and max, both of them included
	 * @param {type} min Lowest value
	 * @param {type} max Greatest value
	 * @returns {Number} Random integer number in the range [min,max]
	 */,
	intRandom2: function(min, max) {
		return Math.round(Math.random() * (max - min + 1)) + min;
	}
	/**
	 * Creates a random number between [min, max)
	 * @param {type} min Lowest value
	 * @param {type} max Greatest value
	 * @returns {Number} Random number in the range [min,max)
	 */,
	random: function(min, max) {
		return (Math.random() * (max - min)) + min;
	}

	/**
	 * Computes euclidean distance between two arrays
	 * @param {array of floats} a First array
	 * @param {array of floats} b Second array
	 * @throws {RangeError} Error if lengths of a and b are differents
	 * @returns {Number} The euclidean distance
	 */,
	distance: function(a, b) {
		if (typeof a === 'undefined') throw new TypeError("Distance can't be computed: " + "first parameter doen't exist ");
		if (typeof b === 'undefined') throw new TypeError("Distance can't be computed: " + "second parameter doen't exist ");
		if (a.length != b.length) throw new RangeError("Distance can't be computed: " + "points have different lengths; " + a.length + " vs " + b.length);

		// Turning parameters into array to apply .map
		a = (a.length) ? a : [a];
		b = (b.length) ? b : [b];
		return Math.sqrt(
		a.map(function(e, i) {
			return e - b[i];
		}).map(function(e) {
			return Math.pow(e, 2);
		}).reduce(function(a, b) {
			return a + b;
		}, 0));
	}
};