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

var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = mongoose.ObjectId,
	autoIncrement = require('mongoose-sequence')(mongoose);

var jsEOExperimentsSchema = new Schema({
	Ip: {type: String},
	Problem: {type: String},
	Poblation: {type: Number},
	NumberGen: {type: Number},
	Time: {type: Number},
	FitnessInitial: {type: Number},
	FitnessFinal: {type: Number}
}, {_id: false, collection: 'Experiments'});

jsEOExperimentsSchema.plugin(autoIncrement);
module.exports = mongoose.model('jsEOExperiments', jsEOExperimentsSchema);
