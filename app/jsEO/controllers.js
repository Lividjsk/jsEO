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

var mongoose = require('mongoose'),
	jsEOTSP = require('./models/jsEOTSP'),
	jsEONQ = require('./models/jsEONQueens'),
	jsEOBit = require('./models/jsEOBitString'),
	jsEOFloat = require('./models/jsEOFloatVector'),
	jsEOExperiments = require('./models/jsEOExperiments'),
	jsEOMO = require('./models/jsEOMO');

/**
 * Description POST method that is called to receive individuals
 * @method sending
 * @param {JSON} req Consultation sent by the client
 * @param {JSON} res Server response
 * @return res 
 */
exports.sending = function(req, res){
	
	allowCORS(res);
	var obj = req.body;
	
	console.log("Datos recibidos en el servidor para insertar", JSON.stringify(obj));
	switch(obj.Problem){
		case 'TSP':
			var id = 0;
			switch(obj.tamIndividual){
				case '5':
					id=1;
					break;
				case '6':
					id=2;
					break;
				case '8':
					id=3;
					break;
				case '12':
					id=4;
					break;
			}
			
			jsEOTSP.findById(id, function(err, individual){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: null, Fitness: null, Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					if(individual != null){
						var obj1 = JSON.parse(obj.Fitness);
						var obj2 = JSON.parse(individual.Fitness);
						if(obj1 < obj2){
							individual.Solution = obj.Solution;
							individual.Fitness = obj.Fitness;
								individual.save(function(err, data){
									if(err) console.log(err);
									else{console.log("Datos para actualizar", data);
										var result = {Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Actualizacion realizada con exito", Problem: obj.Problem};
										res.send(result);
									}
								});
						}else{
							var result = {Solution: null, Fitness: null, Success: false, msg: "Actualizacion fallida", Problem: obj.Problem};
							res.send(result);
						}
					}else{
						var newjseo = new jsEOTSP({
							_id : id,
							Solution: obj.Solution,
							Fitness: obj.Fitness
						});
						newjseo.save(function(err, data){
							if(err) res.send({Solution: null, Fitness: null, Success:false, msg:"Error en la insercion", Problem: obj.data});
							else{
								console.log("Datos guardados", data);
								var result = {Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Primera insercion realizada con exito", Problem: obj.Problem};
								res.send(result);
							}
						});
					}
				}
			});
			break;
		case 'NQueens':
			var id = 0;
			switch(obj.tamIndividual){
				case '4':
					id=1;
					break;
				case '5':
					id=2;
					break;
				case '6':
					id=3;
					break;
				case '8':
					id=4;
					break;
			}
			
			jsEONQ.findById(id, function(err, individual){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: null, Fitness: null, Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					if(individual != null){
						if(obj.Fitness > individual.Fitness){
							individual.Solution = obj.Solution;
							individual.Fitness = obj.Fitness;
							individual.save(function(err, data){
								console.log("Datos guardados", data);
								var result = {Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Actualizacion realizada con exito", Problem: obj.Problem};
								res.send(result);
							});
						}
					}else{
						var newjseo = new jsEONQ({
							_id : id,
							Solution: obj.Solution,
							Fitness: obj.Fitness
						});
						newjseo.save(function(err, data){
							console.log("Datos guardados", data);
							var result = {Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Primera insercion realizada con exito", Problem: obj.Problem};
							res.send(result);
						});
					}
				}
			});
			break;
		case 'BitString':
			var id = 1;
			jsEOBit.findById(id, function(err, individual){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: null, Fitness: null, Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					if(individual != null){
						if(obj.Fitness > individual.Fitness){
							individual.Solution = obj.Solution;
							individual.Fitness = obj.Fitness;
								individual.save(function(err, data){
									console.log("Datos guardados", data);
									var result = {Solution: data.Solution[0], Fitness: data.Fitness, Success: true, msg: "Actualizacion realizada con exito", Problem: obj.Problem};
									res.send(result);
								});
						}
					}else{
						var newjseo = new jsEOBit({
							_id : id,
							Solution: obj.Solution,
							Fitness: obj.Fitness
						});
						newjseo.save(function(err, data){
							console.log("Datos guardados", data);
							var result = {Solution: data.Solution[0], Fitness: data.Fitness, Success: true, msg: "Primera insercion realizada con exito", Problem: obj.Problem};
							res.send(result);
						});
					}
				}
			});
			break;
		case 'FloatVector':
			var id = 1;
			jsEOFloat.findById(id, function(err, individual){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: null, Fitness: null, Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					if(individual != null){
						if(obj.Fitness > individual.Fitness){
							individual.Solution = obj.Solution;
							individual.Fitness = obj.Fitness;
								individual.save(function(err, data){
									console.log("Datos guardados", data);
									var result = {Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Actualizacion realizada con exito", Problem: obj.Problem};
									res.send(result);
								});
						}
					}else{
						var newjseo = new jsEOFloat({
							_id : id,
							Solution: obj.Solution,
							Fitness: obj.Fitness
						});
						newjseo.save(function(err, data){
							console.log("Datos guardados", data);
							var result = {Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Primera insercion realizada con exito", Problem: obj.Problem};
							res.send(result);
						});
					}
				}
			});
			break;
		case 'TSP_MO':
			var id = 0;
			switch(obj.tamIndividual){
				case '5':
					id=1;
					break;
				case '6':
					id=2;
					break;
				case '7':
					id=3;
					break;
				case '8':
					id=4;
					break;
			}
			jsEOMO.findById(id, function(err, individual){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: null, Fitness: null, Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					if(individual != null){
						var obj1 = JSON.parse(obj.Objectives);
						var obj2 = JSON.parse(individual.Objectives);
						if(obj1[0] < obj2[0] || obj1[1] < obj2[1]){
							individual.Solution = obj.Solution;
							individual.Objectives = obj.Objectives;
								individual.save(function(err, data){
									console.log("Datos guardados", data);
									var result = {Solution: data.Solution, Objectives: data.Objectives, Success: true, msg: "Actualizacion realizada con exito", Problem: obj.Problem};
									res.send(result);
								});
						}else{
							var result = {Solution: null, Objectives: null, Success: false, msg: "Actualizacion fallida", Problem: obj.Problem};
									res.send(result);
						}
					}else{
						var newjseo = new jsEOMO({
							_id : id,
							Solution: obj.Solution,
							Objectives: obj.Objectives
						});
						newjseo.save(function(err, data){
							console.log("Datos guardados", data);
							var result = {Solution: data.Solution, Objectives: data.Objectives, Success: true, msg: "Primera insercion realizada con exito", Problem: obj.Problem};
							res.send(result);
						});
					}
				}
			});
			break;
	}
	
}

/**
 * Description GET method that is called to request the best individual of the population
 * @method receiving
 * @param {JSON} req Consultation sent by the client
 * @param {JSON} res Server response
 * @return res 
 */
exports.receiving = function(req, res){
	
	allowCORS(res);
	
	var obj = req.query;
	
	var tam = obj.tamIndividual;
	console.log("Recibida peticion de individuo para :", obj.data);
	
	switch(obj.data){
		case 'TSP':
			var id = 0;
			switch(obj.tamIndividual){
				case '5':
					id=1;
					break;
				case '6':
					id=2;
					break;
				case '8':
					id=3;
					break;
				case '12':
					id=4;
					break;
			}
			jsEOTSP.findById(id, function(err, individual){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(individual !== null){
							var result = {Solution: individual.Solution, Fitness: individual.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data};
							res.send(result);
					}else{
						res.send({Solution: null, Fitness: null, Success: false, msg: "No hay individuos de este tipo aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'NQueens':
			var id = 0;
			switch(obj.tamIndividual){
				case '4':
					id=1;
					break;
				case '5':
					id=2;
					break;
				case '6':
					id=3;
					break;
				case '8':
					id=4;
					break;
			}
			jsEONQ.findById(id, function(err, individual){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(individual != null){
						var result = {Solution: individual.Solution, Fitness: individual.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data};
						res.send(result);
					}else{
						res.send({Solution: null, Fitness: null, Success: false, msg: "No hay individuos de este tipo aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'BitString':
			var id = 1;
			jsEOBit.findById(id, function(err, individual){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(individual != null){
						var result = {Solution: individual.Solution, Fitness: individual.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data};
						res.send(result);
					}else{
						res.send({Solution: null, Fitness: null, Success: false, msg: "No hay individuos de este tipo aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'FloatVector':
			var id = 1;
			jsEOFloat.findById(id, function(err, individual){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(individual != null){
						var result = {Solution: individual.Solution, Fitness: individual.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data};
						res.send(result);
					}else{
						res.send({Solution: null, Fitness: null, Success: false, msg: "No hay individuos de este tipo aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'TSP_MO':
			
			var id = 0;
			switch(obj.tamIndividual){
				case '5':
					id=1;
					break;
				case '6':
					id=2;
					break;
				case '7':
					id=3;
					break;
				case '8':
					id=4;
					break;
			}
			jsEOMO.findById(id, function(err, individual){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(individual != null){
						var result = {Solution: individual.Solution, Objectives: individual.Objectives, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data};
						res.send(result);
					}else{
						res.send({Solution: null, Objectives: null, Success: false, msg: "No hay individuos de este tipo aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
	}
}


/**
 * Description GET Method that is called the first time the application is executed
 * @method root
 * @param {JSON} req Consultation sent by the client
 * @param {JSON} res Server response
 * @return res 
 */
exports.root = function(req, res){
		allowCORS(res);
		deleteCollections();
		res.writeHead( 301, {Location: '../jsEO/index.html'});
		res.send();
}

/**
 * Description POST Method called to save the experiments and / or tests
 * @method experiments
 * @param {JSON} req Consultation sent by the client
 * @param {JSON} res Server response
 * @return res 
 */
exports.experiments = function(req, res){
	allowCORS(res);
	
	var obj = req.body;
	
	var newjseo = new jsEOExperiments({
				Ip : req.connection.remoteAddress,
				Problem: obj.Problem,
				Poblation: obj.Poblation,
				NumberGen: obj.NumberGen,
				Time: obj.Time,
				FitnessInitial: obj.FitnessInitial,
				FitnessFinal: obj.FitnessFinal,
			});
	newjseo.save(function(err, data){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Success:false, msg:"Error al guardar la prueba", Problem: obj.data});
				}else{
					console.log("Datos guardados", data);
					var result = {Success: true, msg: "Se ha guardado la prueba", Problem: obj.data};
					res.send(result);
				}
			});
}

/**
 * Description Deletes collections between different executions
 * @method deleteCollections
 * @return null
 */
function deleteCollections(){
	
	mongoose.connection.db.dropCollection('TSP', function(err, result) {
		if(err) console.log("La coleccion TSP ya ha sido borrada");
		else console.log("Coleccion TSP borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('NQueens', function(err, result) {
		if(err) console.log("La coleccion NQueens ya ha sido borrada");
		else console.log("Coleccion NQUeens borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('TSP_MO', function(err, result) {
		if(err) console.log("La coleccion TSP_MO ya ha sido borrada");
		else console.log("Coleccion TSP_MO borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('BitString', function(err, result) {
		if(err) console.log("La coleccion BitString ya ha sido borrada");
		else console.log("Coleccion BitString borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('FloatVector', function(err, result) {
		if(err) console.log("La coleccion FloatVector ya ha sido borrada");
		else console.log("Coleccion FloatVector borrada con exito");
	});
	//console.log("Colecciones vacías para evitar posibles fallos");
}

/**
 * Description A method that modifies the headers of the answers in order to be interpreted by the client
 * @method allowCORS
 * @param {JSON} res Server response
 * @return null
 */
function allowCORS(res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		res.setHeader('Access-Control-Allow-Headers', '*');
		res.setHeader('Content-Type',  'application/json'); 
}