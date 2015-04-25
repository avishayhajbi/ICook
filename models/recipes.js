var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema( 
{
    id:String,
    date:String,
	category: { type : String , "default" : '' },
    commodities: [ /**/
		{
			name:String,
			amount:{ type : String , "default" : 0 },
            default : []
		}
	],
    name: { type : String , "default" : 'No-Name' },
    description: { type : String , "default" : 'No-Description' },
    preparation: { type : Array , "default" : [] }, /*split*/
    rate: { users:{ type : Array , "default" : [] }, value:{ type:Number , "default" : 0 } },
    comments: [
        {
            email:{ type : String , "default" : '' },
            username: { type : String , "default" : '' },
            comment: { type : String , "default" : '' },
            date: { type : String , "default" : '' },
            default : []
        }
    ],
    user: { type : String , "default" : '' },
    username: { type : String , "default" : 'No-Name' },
    images: { type : Array , "default" : [] },
    accessories: { type : Array , "default" : [] }, 
    kosher:{ type : String , "default" : '' },
    dairy: { type : String , "default" : '' },
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
