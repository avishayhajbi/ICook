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
			amount:{ type : Number , "default" : 0 }
		}
	],
    name: String,/**/
    description: String,/**/
    preparation: { type : Array , "default" : [] }, /*split*/
    rate: { type : Number , "default" : 0 },
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
    kosher: Number, /**/ // change
    dairy: Number,/**/ 
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
    public: { type : Boolean , "default" : true }, 
    language: String,/**/
    price:{ type : Number , "default" : 0 }
	
});
	
mongoose.model('recipes', recipeSchema);
