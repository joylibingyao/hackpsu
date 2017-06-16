var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//only one schema for questions with associated answers to these questions
var UserSchema = new mongoose.Schema({
	username: String,
	account: {type: String,default:"⛄️"},//email
	password: String,

	created_at: {type: Date, default: Date.now },


});
mongoose.model('User', UserSchema);