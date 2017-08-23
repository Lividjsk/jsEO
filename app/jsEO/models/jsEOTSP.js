
var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = mongoose.ObjectId;

var jsEOTSPSchema = new Schema({
	_id: {type: Number},
	Solution: {type: Array},
	Fitness: {type: Number}
}, {collection: 'TSP'});

module.exports = mongoose.model('jsEOTSP', jsEOTSPSchema);
