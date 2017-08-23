var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = mongoose.ObjectId;

var jsEOBitSchema = new Schema({
	_id: {type: Number},
	Solution: {type: Array},
	Fitness: {type: Number}
}, {collection: 'BitString'});

module.exports = mongoose.model('jsEOBitString', jsEOBitSchema);