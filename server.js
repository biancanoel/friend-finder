// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require('./routing/htmlRoutes');
var friends = require('./app/data/friends.js');

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//HTML Routes
require('./routing/htmlRoutes.js')(app);

//API Routes
require('./routing/apiRoutes.js')(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
