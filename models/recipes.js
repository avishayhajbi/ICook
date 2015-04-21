var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema( 
{
    id:String,
    date:String,
	category: Number,/**/
    commodities: [ /**/
		{
			name:String,
			amount:String,
            default : []
		}
	],
    name: { type : String , "default" : 'No-Name' },
    description: { type : String , "default" : 'No-Name' },
    preparation: { type : Array , "default" : [] }, /*split*/
    rate: { type : Number , "default" : 0 },
    comments: [
        {
            email:{ type : String , "default" : '' },
            username: { type : String , "default" : '' },
            comment: { type : String , "default" : '' },
            date: { type : String , "default" : '' },
            default : []
        }
    ],
    user: { type : Number , "default" : 1 },
    username: { type : String , "default" : 'No-Name' },
    images: { type : Array , "default" : [] },
    accessories: { type : Array , "default" : [] }, 
    kosher:{ type : Number , "default" : 1 },
    dairy: { type : Number , "default" : 1 },
    time: { type : Number , "default" : 1 },
    specialPopulations: { type : Array , "default" : [] }, 
    level: { type : Number , "default" : 1 },
    remarks: { type : String , "default" : '' },
    book: {
        book: { type : Boolean , "default" : false }, 
        name: { type : String , "default" : '' }, 
        author: { type : String , "default" : '' }, 
    },
    forWho: { type : Array , "default" : [] },
    public: { type : Boolean , "default" : true }, 
    language: { type : String , "default" : 'he' },
    price:{ type : Number , "default" : 0 }
	
});
	
Recipe = mongoose.model('recipes', recipeSchema);
