var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema( 
	{
		email: String,
	    username: String,
	    favorites:  { type : Array , "default" : [] },
	    recipes: { type : Array , "default" : [] }
	});
	
mongoose.model('users', usersSchema);