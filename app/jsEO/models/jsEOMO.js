
var mongoose = require('mongoose')
	,Schema = mongoose.Schema;

var jsEOMOSchema = new Schema({
	_id: {type: Number},
	Solution: {type: Array},
	Objectives: {type: Array}
}, {collection: 'TSP_MO'})

module.exports = mongoose.model('jsEOMO', jsEOMOSchema);
