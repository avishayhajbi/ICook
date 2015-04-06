var express = require('express');
//var mysql = require('mysql');
var path = require('path');
var bodyParser  = require('body-parser');
var fs = require("fs-extra");
var app = express();
Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    // BSON = require('mongodb').pure().BSON,
    assert = require('assert');

//--------------------------------Connect to mongodb using Mongoose--------------------------------//
var mongoose = require('mongoose');
//--------------------------------Connect to mongodb using Mongoose--------------------------------//

app.use(express.static(path.join(__dirname ,'views')));
app.use(bodyParser()); //{limit:"50mb"}
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json 
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8080;
app.set('port', port);
app.set('view engine', 'ejs');

//--------------------------------Connect to mongodb using Mongoose--------------------------------//
//The server option auto_reconnect is defaulted to true
var options = {
    db: { native_parser : true },
    server: { poolSize: 5 },
    //replset: { rs_name: 'myReplicaSetName' },
    //user: 'b23c6d0f964532',
    //pass: '1fc1c4ed'
    //auth :
    //mongos : true 
};

var connect = function () 
{
  console.log('Mongoose: Trying to establish connection.');
  
  //For long running applictions it is often prudent to enable keepAlive. 
  //Without it, after some period of time you may start to see "connection closed" errors for what seems like no reason.
  //options.server.socketOptions = options.replset.socketOptions = { keepAlive : true };
  options.server.socketOptions = { keepAlive : true, connectTimeoutMS : 30000 };
  
  mongoose.connect('mongodb://icook:imcook@ds061747.mongolab.com:61747/heroku_app34962717', options);
};

// connect to MongoLab using Mongoose
connect();

// make global connection variable
db = mongoose.connection;

// create event handlers for Mongoose
db.on('error', function (err)
{
  console.log('Mongoose: Error: ' + err);
});

db.on('open', function() 
{
  console.log('Mongoose: Connection established.');
});

db.on('disconnected', function()
{
  console.log('Mongoose: Connection stopped, recconect.');
  connect();
});

//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach( function( fileName)
{
  if (~fileName.indexOf('.js')) require(__dirname + '/models/' + fileName);
});
//--------------------------------Connect to mongodb using Mongoose--------------------------------//

app.listen(app.get('port'), function() 
{
    console.log('ICook Server running...' + app.get('port'));
});

//var users = require('./s_users'); 
//app.use(users);  

app.get('/', function(req, res) 
{
    res.render('index', {
    title:"ICook"
  });
});

app.get('/*', function(req, res) 
{
  res.send(405,'page not allowed lecturus');
});