var mongoose = require('mongoose'),
	jsEOTSP = require('./models/jsEOTSP'),
	jsEONQ = require('./models/jsEONQueens'),
	jsEOBit = require('./models/jsEOBitString'),
	jsEOFloat = require('./models/jsEOFloatVector'),
	jsEOMO = require('./models/jsEOMO');

exports.sending = function(req, res){
	allowCORS(res);
	console.log("Enviado");
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
	
	console.log("Recibida peticion de individuo para :", obj);
	
	switch(obj.data){
		case 'TSP':
			jsEOTSP.findOne().sort({Fitness:1}).exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Fitness: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else 
				{
					console.log("Exito consulta", data);
					if(data != null)
						res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
					else
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
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
					console.log("Exito consulta", data);
					if(data != null)
						res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
					else
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});

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
					console.log("Exito consulta", data);
					if(data != null)
						res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
					else
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
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
					console.log("Exito consulta", data);if(data != null)
						res.send({Solution: data.Solution, Fitness: data.Fitness, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
					else
						res.send({Solution: null, Fitness: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
				}
			});
			break;
		case 'TSP_MO':
			jsEOMO.findOne().exec(function(err, data){
				if(err){
					console.log("Error en la consulta", err);
					res.send({Solution: "", Objectives: "", Success: false, msg: "Error en la consulta", Problem: obj.data});
				}else{
					console.log("Exito consulta", data);
					if(data != null)
						res.send({Solution: data.Solution, Objectives: data.Objectives, Success: true, msg: "Obtenido individuo de la BBDD", Problem: obj.data});
					else
						res.send({Solution: null, Objectives: "", Success: false, msg: "No hay individuos aun en la BBDD", Problem: obj.data});
				}
			});
			break;
	}
}


exports.root = function(req, res){
		allowCORS(res);
		console.log("Raiz");
		mongoose.connection.db.dropCollection('TSP', function(err, result) {
			if(err) console.log("Error :", err);
			else console.log("Coleccion borrada con exito");
		});
		res.writeHead( 301, {Location: '../../jsEO/index.html'});
		res.send();
}

function allowCORS(res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		res.setHeader('Access-Control-Allow-Headers', '*');
		//res.setHeader('Content-type', 'application/json' );
	}