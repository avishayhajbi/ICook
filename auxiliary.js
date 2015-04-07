var express = require('express');
var fs = require("fs-extra");
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');
var router = express.Router();
var path = require('path');
var cloudinary = require('cloudinary');
var Q = require('q');

router.get("/auxiliary/getCategories/:lang?", function(req, res) 
{
	var lang, r = {};
	try
	{
        // try to parse the query
        lang = req.query.lang;
	}
	catch(err)
	{
  		console.log("failure while parsing the request, the error:", err);
    	r.status = 0;
    	r.desc = "failure while parsing the request";
    	res.json(r);
	}
	
    if ( lang && lang != "" )	// if data.recipeId property exists in the request is not empty
    {
    	console.log("lang is: " + lang);
    		
		db.model('categories').find({ lang:lang }, { _id : false }, function (err, result)
		//$or: [ { owner : { $in : friends } }, { participants: { $elemMatch: { user : { $in : friends } } } } ] 
		{
        	if (err) 
        	{
        		console.log("--> Err <-- : " + err);
        		r.status = 0;
		    	r.desc = "--> Err <-- : " + err;
		    	res.json(r);
    		}
    		
    	 	if (result)
 			{
 				console.log("the result is: " + result.length);
 				r.status = 1;
		    	r.info = (result.length)?result[0]:[];
		    	res.json(r);
        	}
		});

    }
    else
    {
      	console.log("lang propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "lang propery does not exist in the query or it is empty";
        res.json(r);  
        return;	  	
    }    
});


module.exports = router;