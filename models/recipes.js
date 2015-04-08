var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema( 
{
    id:Number,
    date:String,
	category: Number,/**/
    commodities: [ /**/
		{
			name:String,
			amount:String
		}
	],
    name: String,/**/
    description: String,/**/
    preparation: { type : Array , "default" : [] }, /*split*/
    rate: { type : Number , "default" : 0 },
    comments: [
        {
            email:{ type : String , "default" : '' },
            username: { type : String , "default" : '' },
            comment: { type : String , "default" : '' },
            date: { type : String , "default" : '' }
        }
    ],
    //users:{ type : Array , "default" : [] },
    user: Number, // add
    username: String, // add
    images: { type : Array , "default" : [] },
    accessories: { type : Array , "default" : [] }, 
    kosher: Number, /**/ // change
    dairy: Number,/**/ 
    time: Number,
    specialPopulations: { type : Array , "default" : [] }, 
    level: Number,
    remarks: String,
    book: {
        book: { type : Boolean , "default" : false }, 
        name: { type : String , "default" : '' }, 
        author: { type : String , "default" : '' }, 
    },
    forWho: { type : Array , "default" : [] },
    public: { type : Boolean , "default" : true }, 
    language: String,/**/
    price:{ type : Number , "default" : 0 }
	
});
	
recipes = mongoose.model('recipes', recipeSchema);
