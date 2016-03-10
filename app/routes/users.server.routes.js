"use strict";

// grab our users controller create method
const users = require("../../app/controllers/users.server.controller");

module.exports = function(app) { // will pass in our express app instance
	// on the /users route via the POST HTTP verb; invoke the users.create() method
	app.route("/users").post(users.create);
};