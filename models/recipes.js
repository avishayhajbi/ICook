var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionsSchema = new Schema( 
{
    id:Number,
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
            email: String,
            comment: String
        }
    ],
    user: Number,
    images: { type : Array , "default" : [] },
    accessories: { type : Array , "default" : [] }, 
    kosher: Boolean,
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
	
mongoose.model('recipes', sessionsSchema);
