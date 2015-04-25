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
var assert = require('assert');

router.get("/auxiliary/getCategories/:lang?:check?", function(req, res) 
{
    var lang,check;
	var r = {};
	try
	{
        // try to parse the query
        lang = req.query.lang;
        check = req.query.check || 0;
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
    	console.log("lang is: " + lang , check);
    		
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
                if (check != result[0].check){
     				console.log("the result is: " + result.length);
     				r.status = 1;
    		    	r.info = (result.length)?result[0]:[];
    		    	res.json(r);
                }
                else {
                    console.log("the result is: " + result.length);
                    r.status = 2;
                    res.json(r);
                }
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

router.post("/auxiliary/updateRate", function(req, res) 
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
        console.log("rate is: " , data);
        data.value = parseInt(data.value,10);
        db.model('recipes').findOne({ id:data.recipeId }, function (err, result)
        {
            if (err) 
            {
                console.log("--> Err <-- : " + err);
                r.status = 0;
                r.desc = "--> Err <-- : " + err;
                res.json(r);
                return;
            }
            
            else if (result)
            {
                console.log(data.value)
                if (data.value == 1){
                   // if(result.rate.users.indexOf(data.userId) !== -1){
                        
                        result.rate.value+=1;
                        result.rate.users.push(data.userId);
                    //}
                    console.log("inc" , result.rate)
                }
                else {
                    //if(result.rate.users.indexOf(data.userId) !== -1){
                    if (result.rate.value > 0){
                        result.rate.value-=1;
                        result.rate.users.splice(result.rate.users.indexOf(data.userId),1);
                    }
                    //}
                    console.log("dec" , result.rate.value)
                }
                

                
                
                console.log('rate is: ',result.rate)
                
                result.save(function (err) {
                    if(err) {
                        console.log("--> Err <-- : " + err);
                        r.status = 0;
                        r.desc = "--> Err <-- : " + err;
                        res.json(r);
                        return;
                    }
                    //console.log("the result is: " + result);
                    r.status = 1;
                    r.info = result.rate.value;
                    res.json(r);
                    return;
                });
                
            }
        });

    }
    else
    {
        console.log("rate propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "rate propery does not exist in the query or it is empty";
        res.json(r);  
        return;     
    }    
});

// TODO fix the bugs
/*router.post("/auxiliary/updateFavorite", function(req, res) 
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
        console.log("data is: " , data);
            
        db.model('users').findOne({ email:data.userId }, { _id:false}, function (err, user)
        {
            if (err) 
            {
                console.log("--> Err <-- : " + err);
                r.status = 0;
                r.desc = "--> Err <-- : " + err;
                res.json(r);
            }
            
            if (user)
            {
                console.log("user found",user)
                //var index = user.favorites.indexOf(data.recipeId);
                if (parseInt(data.value)==1)
                db.model('recipes').findOne({ id:data.recipeId }, { _id:false, name:true, forWho:true, id:true }, function (err, recipe)
                {
                    console.log("value is 1 find recipe")
                    if (err) 
                    {
                        console.log("--> Err <-- : " + err);
                        r.status = 0;
                        r.desc = "--> Err <-- : " + err;
                        res.json(r);
                    }
                   
                    else if (recipe)
                    {
                        console.log("find recipe", recipe)
                        if (user.favorites.map(function(d) { return d['id']; }).indexOf(data.recipeId) == -1){
                            console.log("push recipe" )
                            user.favorites.push({id:recipe.id, name: recipe.name, forWho:recipe.forWho})
                        }
                        console.log("new user info", user);
                        user.save(function (err) {
                            if(err) {
                                console.log("--> Err <-- : " + err);
                                r.status = 0;
                                r.desc = "--> Err <-- : " + err;
                                res.json(r);
                                return;
                            }
                            console.log("save user favorites")
                            r.status = 1;
                            res.json(r);
                            return;
                        });
                    }
                }); 
                else {
                    var index = user.favorites.map(function(d) { return d['id']; }).indexOf(data.recipeId)
                    if (index != -1)
                        user.favorites.splice(user.favorites.indexOf(index),1);

                    user.save(function (err) {
                        if(err) {
                            console.log("--> Err <-- : " + err);
                            r.status = 0;
                            r.desc = "--> Err <-- : " + err;
                            res.json(r);
                            return;
                        }
                        //console.log("the result is: " + result);
                        r.status = 1;
                        res.json(r);
                        return;
                    });
                }   
            }
        });

    }
    else
    {
        console.log("favorite propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "favorite propery does not exist in the query or it is empty";
        res.json(r);  
        return;     
    }    
});*/

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
        console.log("data is: " , data);

        /*data.accessories = (data.accessories)?data.accessories.map(Number):undefined;
        data.forWho = (data.forWho)?data.forWho.map(Number):undefined;
        data.specialPopulations = (data.specialPopulations)?data.specialPopulations.map(Number):undefined;*/
        data.accessories = (data.accessories!=0)?data.accessories:undefined;
        data.forWho = (data.forWho!=0)?data.forWho:undefined;
        data.specialPopulations = (data.specialPopulations!=0)?data.specialPopulations:undefined;

        data.user = (data.user!=0)?data.user:undefined;
        data.kosher = (data.kosher!=0)?data.kosher:undefined;
        data.dairy = (data.dairy!=0)?data.dairy:undefined;
        data.category = (data.category!=0)?data.category:undefined;

        console.log(data)

        db.model('recipes').find( { $and: [
        { category : data.category || {$exists:true} } , 
        {user : data.user || {$exists:true} }, 
        {dairy : data.dairy || {$exists:true} }, 
        {kosher : data.kosher || {$exists:true} },
        /*{ accessories : {$all: data.accessories }|| {$exists:true} }, 
        { forWho : {$all: data.forWho } || {$exists:true} }, 
        { specialPopulations : {$all: data.specialPopulations }|| {$exists:true} }*/
        ] }, { _id : false, name:true, forWho:true, id:true }, function (err, result)
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

router.post("/auxiliary/nameFilter", function(req, res) 
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

        console.log(JSON.stringify(data))
        db.model('recipes').find( { "name": { "$regex":data.name , "$options": "i" } } , { _id : false }, function (err, result)
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
        console.log("lang propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "lang propery does not exist in the query or it is empty";
        res.json(r);  
        return;     
    }    
});

module.exports = router;
