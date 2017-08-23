var mongoose = require('mongoose')
	,Schema = mongoose.Schema
	,ObjectId = mongoose.ObjectId;

var jsEOFloatSchema = new Schema({
	_id: {type: Number},
	Solution: {type: Array},
	Fitness: {type: Number}
}, {collection: 'FloatVector'});

module.exports = mongoose.model('jsEOFloatVector', jsEOFloatSchema);