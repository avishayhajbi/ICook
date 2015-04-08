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
    var lang;
	var r = {};
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
        return;
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

router.post("/auxiliary/simpleFilter", function(req, res) 
{
    var data;
    var r = {};
    try
    {
        // try to parse the query
        data = req.body;
    }
    catch(err)
    {
        console.log("failure while parsing the request, the error:", err);
        r.status = 0;
        r.desc = "failure while parsing the request";
        res.json(r);
        return;
    }
    
    if ( data && data != "" )   // if data.recipeId property exists in the request is not empty
    {
        console.log("data is: " + data);
        data.accessories = (data.accessories)?data.accessories.map(Number):undefined;
        data.forWho = (data.forWho)?data.forWho.map(Number):undefined;
        data.specialPopulations = (data.specialPopulations)?data.specialPopulations.map(Number):undefined;
        db.model('recipes').find( { $and: [
        { category : data.category || {$exists:true} } , 
        {user : data.user || {$exists:true} }, 
        {dairy : data.dairy || {$exists:true} }, 
        {kosher : data.kosher || {$exists:true} },
        { accessories : { $all : data.accessories } || {$exists:true} }, 
        { forWho : { $all : data.forWho } || {$exists:true} }, 
        { specialPopulations : { $all : data.specialPopulations } || {$exists:true} } 
        ] }, { _id : false }, function (err, result)
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
        console.log("data propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "data propery does not exist in the query or it is empty";
        res.json(r);  
        return;     
    }    
});

router.post("/auxiliary/advancedFilter", function(req, res) 
{
    var data;
    var r = {};
    try
    {
        // try to parse the query
        data = req.body;
    }
    catch(err)
    {
        console.log("failure while parsing the request, the error:", err);
        r.status = 0;
        r.desc = "failure while parsing the request";
        res.json(r);
        return;
    }
    
    if ( data && data != "" )   // if data.recipeId property exists in the request is not empty
    {
        console.log("data is: " + data);
            
        db.model('recipes').find({  }, { _id : false }, function (err, result)
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
        console.log("lang propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "lang propery does not exist in the query or it is empty";
        res.json(r);  
        return;     
    }    
});

module.exports = router;