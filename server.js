
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

	var express = require('express');
	var mongoose = require('mongoose');
	var bodyparser = require('body-parser');
	var app = express();
	
	app.use( express.static(__dirname+''));
	app.use(bodyparser.urlencoded({ extended: false }))
	app.use(bodyparser.json());

	mongoose.connect('mongodb://localhost:27017/jsEO', {useMongoClient: true});

	var api = require('./app/jsEO/controllers.js');
	app.post('/sending', api.sending);
	app.post('/experiments', api.experiments);
	app.get('/receiving', api.receiving);
	app.get('/', api.root);
	
	var puerto = 8888;
	var ip = "0.0.0.0";
	app.listen(puerto, ip);
	console.log("Servidor escuchando en el puerto " + puerto);
