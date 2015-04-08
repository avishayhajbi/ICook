var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema( 
{
    lang: String,
    length:Number,
    issues:{ type : Array , "default" : [] },
    category: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
    user: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
    dairy: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
    kosher: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
    forWho: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
    accessories: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
    specialPopulations: {
        question:String,
        res:[
            {
                id: Number,
                key: String,
                url: String
            }
        ]
    },
	
});
	
mongoose.model('categories', categorySchema);
