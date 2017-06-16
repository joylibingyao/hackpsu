var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//type?????????????
var LinkSchema = new mongoose.Schema({
	url:{type: String, default:""},
	message: {type:String, default:"This Link is fantastic......"},

	user_name:String,
	_user:{type: Schema.ObjectId, ref: 'User'},

	class_name:String,
	_class:{type: Schema.ObjectId, ref: 'Class'},

	likes:{type: Number, default:0},

	created_at: {type: Date, default: Date.now }
});

mongoose.model('Link', LinkSchema);