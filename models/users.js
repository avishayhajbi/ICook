var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema( 
	{
		email: String,
	    name: String,
	    image:String,
	    favorites:  [{ id : String, forWho:Array, name:String , default : [] }],
	    recipes:  [{ id : String, forWho:Array, name:String , default : [] }],
	});
	
User =mongoose.model('users', usersSchema);
