var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema( 
{
    id:Number,
    date:Date,
	category: Number,
    commodities: [
		{
			name:String,
			amount:String
		}
	],
    name: String,
    description: String,
    preparation: { type : Array , "default" : [] },
    rate: Number,
    comments: [
        {
            email:String,
            username: String,
            comment: String,
            date: Date
        }
    ],
    user: Number, // add
    username: String, // add
    images: { type : Array , "default" : [] },
    accessories: { type : Array , "default" : [] }, 
    kosher: Number, // change
    dairy: Number, 
    time: Number,
    specialPopulations: { type : Array , "default" : [] }, 
    level: Number,
    remarks: String,
    book: {
        book: Boolean,
        name: String,
        author: String
    },
    forWho: { type : Array , "default" : [] },
    public: Boolean,
    language: String,
    price:Number
	
});
	
mongoose.model('recipes', recipeSchema);
