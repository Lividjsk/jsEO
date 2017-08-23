
	var express = require('express');
	var mongoose = require('mongoose');
	var bodyparser = require('body-parser');
	var app = express();
	
	app.use( express.static(__dirname+''));
	app.use(bodyparser.urlencoded({ extended: false }))
	app.use(bodyparser.json());


	mongoose.connect('mongodb://localhost:27017/jsEO');

	var api = require('./app/jsEO/controllers.js');
	app.post('/sending', api.sending);
	app.get('/receiving', api.receiving);
	app.get('/', api.root);
	
	var puerto = 8888;
	var ip = "0.0.0.0";
	app.listen(puerto, ip);
	console.log("Servidor escuchando en "+ip+":"+puerto);
