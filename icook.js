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

router.post("/icook/getRecipeById", function(req, res) 
{
	var recipeId, r = {};
	try
	{
        // try to parse the json data
        data = req.body;
        recipeId = req.body.recipeId;
	}
	catch(err)
	{
  		console.log("failure while parsing the request, the error:", err);
    	r.status = 0;
    	r.desc = "failure while parsing the request";
    	res.json(r);
	}
	
    if ( recipeId && recipeId != "" )	// if data.recipeId property exists in the request is not empty
    {
    	console.log("recipeId is: " + recipeId);
    		
		db.model('recipes').find({ id:recipeId }, { _id : false }, function (err, result)
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
		    	r.info = (result.length)?result:[];
		    	res.json(r);
        	}
		});

    }
    else
    {
      	console.log("data.recipeId propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "data.recipeId propery does not exist in the query or it is empty";
        res.json(r);  
        return;	  	
    }    
});


module.exports = router;