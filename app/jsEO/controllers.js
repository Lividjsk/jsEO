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

exports.sending = function(req, res) {

	allowCORS(res);
	var obj = req.body;

	console.log("Data received on the server to insert", JSON.stringify(obj));
	switch (obj.Problem) {
	case 'TSP':
		var newjseo = new jsEOTSP({
			_id: obj.id,
			Solution: obj.Solution,
			Fitness: obj.Fitness
		});

		newjseo.save(function(err, data) {
			if (err) {
				console.log("Insertion error", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Insertion error",
					Problem: obj.data
				});
			} else {
				console.log("Data saved", data);
				var result = {
					Solution: data.Solution[0],
					Fitness: data.Fitness,
					Success: true,
					msg: "Insertion made with success",
					Problem: 'TSP'
				};
				res.send(result);
			}
		});
		break;
	case 'NQueens':
		var newjseo = new jsEONQ({
			_id: obj.id,
			Solution: obj.Solution,
			Fitness: obj.Fitness
		});

		newjseo.save(function(err, data) {
			if (err) {
				console.log("Insertion error", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Insertion error",
					Problem: obj.data
				});
			} else {
				console.log("Data saved", data);
				var result = {
					Solution: data.Solution[0],
					Fitness: data.Fitness,
					Success: true,
					msg: "Insertion made with success",
					Problem: 'NQueens'
				};
				res.send(result);
			}
		});
		break;
	case 'BitString':
		var newjseo = new jsEOBit({
			_id: obj.id,
			Solution: obj.Solution,
			Fitness: obj.Fitness
		});

		newjseo.save(function(err, data) {
			if (err) {
				console.log("Insertion error", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Insertion error",
					Problem: obj.data
				});
			} else {
				console.log("Data saved", data);
				var result = {
					Solution: data.Solution[0],
					Fitness: data.Fitness,
					Success: true,
					msg: "Insertion made with success",
					Problem: 'NQueens'
				};
				res.send(result);
			}
		});
		break;
	case 'FloatVector':
		var newjseo = new jsEOFloat({
			_id: obj.id,
			Solution: obj.Solution,
			Fitness: obj.Fitness
		});

		newjseo.save(function(err, data) {
			if (err) {
				console.log("Insertion error", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Insertion error",
					Problem: obj.data
				});
			} else {
				console.log("Data saved", data);
				var result = {
					Solution: data.Solution[0],
					Fitness: data.Fitness,
					Success: true,
					msg: "Insertion made with success",
					Problem: 'NQueens'
				};
				res.send(result);
			}
		});
		break;
	case 'TSP_MO':
		var newjseo = new jsEOMO({
			_id: obj.id,
			Solution: obj.Solution,
			Objectives: obj.Objectives
		});

		newjseo.save(function(err, data) {
			if (err) {
				console.log("Insertion error", err);
				res.send({
					Solution: "",
					Objectives: "",
					Success: false,
					msg: "Insertion error",
					Problem: obj.data
				});
			} else {
				console.log("Data saved", data);
				var result = {
					Solution: data.Solution[0],
					Objectives: data.Objectives,
					Success: true,
					msg: "Insertion made with success",
					Problem: 'TSP_MO'
				};
				res.send(result);
			}
		});
		break;
	}

}

exports.receiving = function(req, res) {

	allowCORS(res);

	var obj = req.query;

	var tam = obj.tamIndividual;
	console.log("Received request of individual for:", obj);

	switch (obj.data) {
	case 'TSP':
		jsEOTSP.findOne().sort({
			Fitness: 1
		}).exec(function(err, data) {
			if (err) {
				console.log("Error in the query", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Error in the query",
					Problem: obj.data
				});
			} else {
				if (data != null) {
					console.log("Success consultation", data);
					if (JSON.parse(data.Solution.length) === tam) {
						res.send({
							Solution: data.Solution,
							Fitness: data.Fitness,
							Success: true,
							msg: "Obtained Individual of the BBDD",
							Problem: obj.data
						});
					} else {
						res.send({
							Solution: null,
							Fitness: "",
							Success: false,
							msg: "Obtained individual from the BBDD but does not match the requested. Error.",
							Problem: obj.data
						});
					}
				} else {
					res.send({
						Solution: null,
						Fitness: "",
						Success: false,
						msg: "No individuals even in the BBDD",
						Problem: obj.data
					});
				}
			}
		});
		break;
	case 'NQueens':
		jsEONQ.findOne().exec(function(err, data) {
			if (err) {
				console.log("Error in the query", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Error in the query",
					Problem: obj.data
				});
			} else {
				if (data != null) {
					console.log("Success consultation", data);
					if (JSON.parse(data.Solution.length) === tam) {
						res.send({
							Solution: data.Solution,
							Fitness: data.Fitness,
							Success: true,
							msg: "Obtained Individual of the BBDD",
							Problem: obj.data
						});
					} else {
						res.send({
							Solution: null,
							Fitness: "",
							Success: false,
							msg: "Obtained individual from the BBDD but does not match the requested. Error.",
							Problem: obj.data
						});
					}
				} else {
					res.send({
						Solution: null,
						Fitness: "",
						Success: false,
						msg: "No individuals even in the BBDD",
						Problem: obj.data
					});
				}
			}
		});
		break;
	case 'BitString':
		jsEOBit.findOne().exec(function(err, data) {
			if (err) {
				console.log("Error in the query", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Error in the query",
					Problem: obj.data
				});
			} else {
				if (data != null) {
					console.log("Success consultation", data);
					if (JSON.parse(data.Solution.length) === tam) {
						res.send({
							Solution: data.Solution,
							Fitness: data.Fitness,
							Success: true,
							msg: "Obtained Individual of the BBDD",
							Problem: obj.data
						});
					} else {
						res.send({
							Solution: null,
							Fitness: "",
							Success: false,
							msg: "Obtained individual from the BBDD but does not match the requested. Error.",
							Problem: obj.data
						});
					}
				} else {
					res.send({
						Solution: null,
						Fitness: "",
						Success: false,
						msg: "No individuals even in the BBDD",
						Problem: obj.data
					});
				}
			}
		});
		break;
	case 'FloatVector':
		jsEOFloat.findOne().exec(function(err, data) {
			if (err) {
				console.log("Error in the query", err);
				res.send({
					Solution: "",
					Fitness: "",
					Success: false,
					msg: "Error in the query",
					Problem: obj.data
				});
			} else {
				if (data != null) {
					console.log("Success consultation", data);
					if (JSON.parse(data.Solution.length) === tam) {
						res.send({
							Solution: data.Solution,
							Fitness: data.Fitness,
							Success: true,
							msg: "Obtained Individual of the BBDD",
							Problem: obj.data
						});
					} else {
						res.send({
							Solution: null,
							Fitness: "",
							Success: false,
							msg: "Obtained individual from the BBDD but does not match the requested. Error.",
							Problem: obj.data
						});
					}
				} else {
					res.send({
						Solution: null,
						Fitness: "",
						Success: false,
						msg: "No individuals even in the BBDD",
						Problem: obj.data
					});
				}
			}
		});
		break;
	case 'TSP_MO':
		jsEOMO.findOne().exec(function(err, data) {
			if (err) {
				console.log("Error in the query", err);
				res.send({
					Solution: "",
					Objectives: "",
					Success: false,
					msg: "Error in the query",
					Problem: obj.data
				});
			} else {
				if (data != null) {
					console.log("Success consultation", data);
					if (JSON.parse(data.Solution.length) === tam) {
						res.send({
							Solution: data.Solution,
							Objectives: data.Objectives,
							Success: true,
							msg: "Obtained Individual of the BBDD",
							Problem: obj.data
						});
					} else {
						res.send({
							Solution: null,
							Fitness: "",
							Success: false,
							msg: "Obtained individual from the BBDD but does not match the requested. Error.",
							Problem: obj.data
						});
					}
				} else {
					res.send({
						Solution: null,
						Objectives: "",
						Success: false,
						msg: "No individuals even in the BBDD",
						Problem: obj.data
					});
				}
			}
		});
		break;
	}
}


exports.root = function(req, res) {
	allowCORS(res);
	deleteCollections();
	res.writeHead(301, {
		Location: '../jsEO/index.html'
	});
	res.send();
}

function deleteCollections() {

	mongoose.connection.db.dropCollection('TSP', function(err, result) {
		if (err) console.log("Error in TSP: ", err);
		else console.log("Collection TSP erased successfully");
	});

	mongoose.connection.db.dropCollection('NQueens', function(err, result) {
		if (err) console.log("Error in NQueens: ", err);
		else console.log("Collection NQueens erased successfully");
	});

	mongoose.connection.db.dropCollection('TSP_MO', function(err, result) {
		if (err) console.log("Error in TSP_MO: ", err);
		else console.log("Collection TSP_MO erased successfully");
	});

	mongoose.connection.db.dropCollection('BitString', function(err, result) {
		if (err) console.log("Error in BitString: ", err);
		else console.log("Collection BitString erased successfully");
	});

	mongoose.connection.db.dropCollection('FloatVector', function(err, result) {
		if (err) console.log("Error in FloatVector: ", err);
		else console.log("Collection FloatVector erased successfully");
	});
	console.log("Empty collections to avoid possible failures");
}

function allowCORS(res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
}