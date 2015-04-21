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
    var data, recipeId; 
	var r = {};
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
        return;
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
		    	r.info = (result.length)?result[0]:[];
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

router.post("/icook/insertRecipe",function(req, res) 
{
    var userip = req.connection.remoteAddress.replace(/\./g , '');
    var uniqueid = parseInt( new Date().getTime()+userip,10);
    var data;
    var r = {};
   
    
  var form = new formidable.IncomingForm();
 
  form.parse(request, function(error, fields, files) 
  {
      console.log('-->PARSE<--');
      //logs the file information 
      fields.id = uniqueid;

       console.log(JSON.stringify(fields))
  });
  
  form.on('progress', function(bytesReceived, bytesExpected) 
  {
      var percent_complete = (bytesReceived / bytesExpected) * 100;
      console.log(percent_complete.toFixed(2));
  });

  form.on('error', function(err) 
  {
      console.log("-->ERROR<--");
      console.error(err);
      console.log("failure while parsing the request, the error:", err);
        r.status = 0;
        r.desc = "failure while parsing the request";
        res.json(r);
        return;
  });
  
  form.on('end', function(error, fields, files) 
  {
            console.error(fields);
         new Recipe(fields).save(function (e) {
        db.model('users').find({ email:data.email }, { recipes:true ,_id:false}, function (err, result){
            if (err)res.send(1);
            else{
                result[0].recipes.push(data.id); 
                db.model('users').update({ email:data.email }, { $set:{recipes:result[0].recipes } }, function (err, result){
                    if (err) res.send(1);
                    else res.send(0);
                });
            }
        });
      });
    });
});

router.post("/icook/getUserFavorites",function(req, res) 
{
    var r = {};
    try
    {
        // try to parse the json data
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
    console.log(JSON.stringify(data))

    
    if ( data && data != "" )   // if data property exists in the request is not empty
    {
        db.model('users').find({ email:data.email }, { favorites:true ,_id : false }, function (err, result)
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
                console.log(result)
                if (result.length)
                db.model('recipes').find( { id : { $in : result[0].favorites } || {$exists:true} }, { _id : false }, function (err, result)
                {
                    if (err) 
                    {
                        console.log("--> Err <-- : " + err);
                        r.status = 0;
                        r.desc = "--> Err <-- : " + err;
                        res.json(r);
                        return;
                    }
                    
                    if (result)
                    {
                        console.log("the result is: " + result.length);
                        r.status = 1;
                        r.info = (result.length)?result:[];
                        res.json(r);
                        return;
                    }
                });
                else{
                    console.log("the result is: " + result.length);
                    r.status = 1;
                    r.info = (result.length)?result[0]:[];
                    res.json(r);
                }
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


router.post("/icook/getUserRecipes",function(req, res) 
{
    var r = {};
    try
    {
        // try to parse the json data
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
    console.log(JSON.stringify(data))

    
    if ( data && data != "" )   // if data property exists in the request is not empty
    {
        db.model('users').find({ email:data.email }, { recipes:true ,_id : false }, function (err, result)
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
                console.log(result)
                if (result.length)
                db.model('recipes').find( { id : { $in : result[0].recipes } || {$exists:true} }, { _id : false }, function (err, result)
                {
                    if (err) 
                    {
                        console.log("--> Err <-- : " + err);
                        r.status = 0;
                        r.desc = "--> Err <-- : " + err;
                        res.json(r);
                        return;
                    }
                    
                    if (result)
                    {
                        console.log("the result is: " + result.length);
                        r.status = 1;
                        r.info = (result.length)?result:[];
                        res.json(r);
                        return;
                    }
                });
                else{
                    console.log("the result is: " + result.length);
                    r.status = 1;
                    r.info = (result.length)?result[0]:[];
                    res.json(r);
                }
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

router.post("/icook/updateRecipe", function(req, res) 
{   
    var recipeId, data;
    var r = {};
    try
    {
        // try to parse the json data
        data = req.body;
        recipeId = req.body.id;
    }
    catch(err)
    {
        console.log("failure while parsing the request, the error:", err);
        r.status = 0;
        r.desc = "failure while parsing the request";
        res.json(r);
        return;
    }
    
    if ( data && data != "" )   // if data property exists in the request is not empty
    {
        console.log("data is: " + data);
            
        db.model('recipes').update({id:recipeId},{$set:data}, function (err, result)
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
                console.log("the result is: " + result);
                r.status = 1;
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



router.post("/icook/insertUser",function(req, res) 
{
    //var userip = req.connection.remoteAddress.replace(/\./g , '');
    //var uniqueid = parseInt( new Date().getTime()+userip,10);
    var data;
    var r = {};
    //console.log(req)
    try
    {
        // try to parse the json data
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
   //console.log(JSON.stringify(data))

    
    if ( data && data != "" )   // if data property exists in the request is not empty
    {

        console.log("data is: " + JSON.stringify(data));

        db.model('users').findOneAndUpdate({email: data.email}, data , {upsert :false},function (err, result)
        {

            if (err) 
            {
                console.log("--> Err <-- : " + err);
                r.status = 0;
                r.desc = "--> Err <-- : " + err;
                res.json(r);
                return;
            }
            
            else
            {
                if (!result)
                    new User(data).save(function (e) {
                        if (e) res.json({status:0});
                        res.json({status:1});
                    });
                else  res.json({status:1});

                return;
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

module.exports = router;