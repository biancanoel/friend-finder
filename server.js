// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require('./routing/htmlRoutes');
var friends = require('./app/data/friends.js');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes to home page and survey page
require('./routing/htmlRoutes.js')(app);

////////////////////API ROUTES 
require('./routing/apiRoutes.js')(app);


// app.get("/friends", function (req, res) {
//     return res.json(friends);
// });

// app.post("/api/new", function (req, res) {
//     var newFriend = req.body;
  
//     var scoresInt = [];
//     newFriend.scores.forEach(function (score) {
//         scoresInt.push(parseInt(score));
//     });

//     //Determine best friend match 
//     var highScore = 1000;
//     var bestFriend;

//     for (i = 0; i < friends.length; i++) {
//         var sum = 0;
//         for (j = 0; j < friends[i].scores.length; j++) {
//             sum += Math.abs(scoresInt[j] - friends[i].scores[j]);
//         }
//         if (sum < highScore) {
//             highScore = sum;
//             bestFriend = friends[i];
//         };
//     }; 

//     friends.push(newFriend);
//     return res.json(bestFriend);
// });


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
