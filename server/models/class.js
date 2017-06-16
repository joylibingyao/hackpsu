var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//only one schema for questions with associated answers to these questions
var ClassSchema = new mongoose.Schema({
	cname:String,
	links:[{type: Schema.Types.ObjectId, ref: 'Link'}]
});
mongoose.model('Class', ClassSchema);