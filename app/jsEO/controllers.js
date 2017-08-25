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
	jsEOMO = require('./models/jsEOMO');

exports.sending = function(req, res){
	
	allowCORS(res);
	var obj = req.body;
	
	console.log("Datos recibidos en el servidor para insertar", JSON.stringify(obj));
	switch(obj.Problem){
		case 'TSP':
			var newjseo = new jsEOTSP({
				_id : obj.id,
				Solution: obj.Solution,
				Fitness: obj.Fitness
			});
			
			newjseo.save(function(err, data){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: "", Fitness: "", Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					console.log("Datos guardados", data);
					var result = {Solution: data.Solution[0], Fitness: data.Fitness, Success: true, msg: "Insercion realizada con exito", Problem: 'TSP'};
					res.send(result);
				}
			});
			break;
		case 'NQueens':
			var newjseo = new jsEONQ({
				_id : obj.id,
				Solution: obj.Solution,
				Fitness: obj.Fitness
			});
			
			newjseo.save(function(err, data){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: "", Fitness: "", Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					console.log("Datos guardados", data);
					var result = {Solution: data.Solution[0], Fitness: data.Fitness, Success: true, msg:"Insercion realizada con exito", Problem: 'NQueens'};
					res.send(result);
				}
			});
			break;
		case 'BitString':
			var newjseo = new jsEOBit({
				_id : obj.id,
				Solution: obj.Solution,
				Fitness: obj.Fitness
			});
			
			newjseo.save(function(err, data){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: "", Fitness: "", Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					console.log("Datos guardados", data);
					var result = {Solution: data.Solution[0], Fitness: data.Fitness, Success: true, msg:"Insercion realizada con exito", Problem: 'NQueens'};
					res.send(result);
				}
			});
			break;
		case 'FloatVector':
			var newjseo = new jsEOFloat({
				_id : obj.id,
				Solution: obj.Solution,
				Fitness: obj.Fitness
			});
			
			newjseo.save(function(err, data){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: "", Fitness: "", Success:false, msg:"Error en la insercion", Problem: obj.data});
				}else{
					console.log("Datos guardados", data);
					var result = {Solution: data.Solution[0], Fitness: data.Fitness, Success: true, msg:"Insercion realizada con exito", Problem: 'NQueens'};
					res.send(result);
				}
			});
			break;
		case 'TSP_MO':
			var newjseo = new jsEOMO({
				_id : obj.id,
				Solution: obj.Solution,
				Objectives: obj.Objectives
			});
			
			newjseo.save(function(err, data){
				if(err){
					console.log("Error en la insercion", err);
					res.send({Solution: "", Objectives: "", Success:false, msg:"Error en la insercion", Problem: obj.data});
				}
				else{
					console.log("Datos guardados", data);
					var result = {Solution: data.Solution[0], Objectives: data.Objectives, Success: true, msg:"Insercion realizada con exito", Problem: 'TSP_MO'};
					res.send(result);
				}
			});
			break;
	}
	
}

exports.receiving = function(req, res){
	
	allowCORS(res);
	
	var obj = req.query;
	
	var tam = obj.tamIndividual;
	console.log("Recibida peticion de individuo para :", obj);
	
	switch(obj.data){
		case 'TSP':
			jsEOTSP.findOne().sort({Fitness:1}).exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(data != null){
						console.log("Exito consulta", data);
						if(JSON.parse(data.Solution.length) === tam){
							res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
						}else{
							res.send({Solution: null, Fitness: "", Success: false, msg: "Obtenido individuo de la BBDD pero no coincide con el solicitado. Error.", Problem: obj.data});
						}
					}else{
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'NQueens':
			jsEONQ.findOne().exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(data != null){
						console.log("Exito consulta", data);
						if(JSON.parse(data.Solution.length) === tam){
							res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
						}else{
							res.send({Solution: null, Fitness: "", Success: false, msg: "Obtenido individuo de la BBDD pero no coincide con el solicitado. Error.", Problem: obj.data});
						}
					}else{
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'BitString':
			jsEOBit.findOne().exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(data != null){
						console.log("Exito consulta", data);
						if(JSON.parse(data.Solution.length) === tam){
							res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
						}else{
							res.send({Solution: null, Fitness: "", Success: false, msg: "Obtenido individuo de la BBDD pero no coincide con el solicitado. Error.", Problem: obj.data});
						}
					}else{
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'FloatVector':
			jsEOFloat.findOne().exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					if(data != null){
						console.log("Exito consulta", data);
						if(JSON.parse(data.Solution.length) === tam){
							res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
						}else{
							res.send({Solution: null, Fitness: "", Success: false, msg: "Obtenido individuo de la BBDD pero no coincide con el solicitado. Error.", Problem: obj.data});
						}
					}else{
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
		case 'TSP_MO':
			jsEOMO.findOne().exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Objectives: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else{
					if(data != null){
						console.log("Exito consulta", data);
						if(JSON.parse(data.Solution.length) === tam){
							res.send({Solution: data.Solution, Objectives: data.Objectives, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
						}else{
							res.send({Solution: null, Fitness: "", Success: false, msg: "Obtenido individuo de la BBDD pero no coincide con el solicitado. Error.", Problem: obj.data});
						}
					}else{
						res.send({Solution: null, Objectives: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
					}
				}
			});
			break;
	}
}


exports.root = function(req, res){
		allowCORS(res);
		deleteCollections();
		res.writeHead( 301, {Location: '../jsEO/index.html'});
		res.send();
}

function deleteCollections(){
	
	mongoose.connection.db.dropCollection('TSP', function(err, result) {
		if(err) console.log("Error en TSP: ", err);
		else console.log("Coleccion TSP borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('NQueens', function(err, result) {
		if(err) console.log("Error en NQueens: ", err);
		else console.log("Coleccion NQUeens borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('TSP_MO', function(err, result) {
		if(err) console.log("Error en TSP_MO: ", err);
		else console.log("Coleccion TSP_MO borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('BitString', function(err, result) {
		if(err) console.log("Error en BitString: ", err);
		else console.log("Coleccion BitString borrada con exito");
	});
	
	mongoose.connection.db.dropCollection('FloatVector', function(err, result) {
		if(err) console.log("Error en FloatVector: ", err);
		else console.log("Coleccion FloatVector borrada con exito");
	});
	console.log("Colecciones vacías para evitar posibles fallos");
}

function allowCORS(res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		res.setHeader('Access-Control-Allow-Headers', '*');
		//res.setHeader('Content-type', 'application/json' );
}