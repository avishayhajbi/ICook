var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema( 
	{
		email: String,
	    fullname: String,
	    favorites:  { type : Array , "default" : [] },
	    recipes: { type : Array , "default" : [] }
	});
	
users=mongoose.model('users', usersSchema);
