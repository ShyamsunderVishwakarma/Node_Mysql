var express = require('express')
var app = express();
var configuration = require('./configuration/config');
var genRoute = require('./routes/genRoute.js')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
//MySql Connection

var connection = require('express-myconnection')
var mysql = require('mysql')
var sqlOption = {
	host : configuration.mysqlconfig.hostname,
	user : configuration.mysqlconfig.username,
	password : configuration.mysqlconfig.password,
	database : configuration.mysqlconfig.database
};

app.use(connection(mysql,sqlOption,'request'));

app.use('/',genRoute)



var server = app.listen('8080',function(){
	console.log("server started at port 8080!!!");
})