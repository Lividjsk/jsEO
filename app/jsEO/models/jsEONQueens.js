var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = mongoose.ObjectId;

var jsEONQSchema = new Schema({
	_id: {type: Number},
	Solution: {type: Array},
	Fitness: {type: Number}
}, {collection: 'NQueens'});

module.exports = mongoose.model('jsEONQ', jsEONQSchema);