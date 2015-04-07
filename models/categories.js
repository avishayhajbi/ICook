var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionsSchema = new Schema( 
{
    lang: String,
    category: [
        {
            id: Number,
            key: String,
            url: String
        }
    ],
    user: [
        {
            id: Number,
            key: String,
            url: String
        }
    ],
    dairy: [
        {
            id: Number,
            key: String,
            url: String
        }
    ],
    kosher: [
        {
            id: Number,
            key: String,
            url: String
        }
    ],
    forWho: [
        {
            id: Number,
            key: String,
            url: String
        }
    ],
    accessories: [
        {
            id: Number,
            key: String,
            url: String
        }
        
    ],
    specialPopulations: [
        {
            id: Number,
            key: String,
            url: String
        }
    ]
	
});
	
mongoose.model('categories', sessionsSchema);
