"use strict";

const express = require("express"), // grab our express module
	  config = require("./config"), // grab our config file
	  bodyParser = require("body-parser"); // grab our body-parser module

module.exports = function() {
	const app = express(); // create an instance of express (express app)

	// add middleware 
	app.use(bodyParser.urlencoded({
		extended: true // encode our url's...
	}));
	app.use(bodyParser.json()); // expect JSON data format
	// CORS (TODO: research this a lot more...)
	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
		next();
	});

	app.use(express.static("./public")); // expect all static files to come from 
										 // ./public dir

	app.set("views", "./app/views"); // expect our views to come from ./app/views dir
	app.set("view engine", "ejs"); // set template engine: ejs module

	// not worried about the index route just yet...
	require("../app/routes/index.server.routes")(app); 
	// NOTE: make sure postman content-type is set to JSON!!!
	require("../app/routes/users.server.routes")(app); // grab the user.server.routes function
	
	// return the express app for the server.js file
	return app;
};