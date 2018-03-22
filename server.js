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

//Routes to api calls
//GET route to display a JSON of all possible friends
app.get("/friends", function (req, res) {
    return res.json(friends);
});
//require('./routing/apiRoutes.js')(app);
//Routes to home page and survey page
require('./routing/htmlRoutes.js')(app);


//require('./routing/apiRoutes.js')(app);
//POST route to add a new friend 

app.post("/api/new", function (req, res) {
    var newFriend = req.body;
    console.log(newFriend);
   
    //console.log(friends);

    //FIND A FRIEND MATCH
    //Convert new scores to integer
    var scoresInt = [];
    newFriend.scores.forEach(function (score) {
        scoresInt.push(parseInt(score));
    })
    console.log('The new friends score are ' + scoresInt);
    //Comvert existing friend scores to integers
    var friendsScoresInt=[];
    for (i=0; i<friends.length; i++) {
        friendsScoresInt.push(friends[i].scores.map(Number));
    }
    console.log(friendsScoresInt);

    var highScore = 1000;
    var bestFriend;

    // for (i=0; i < friendsScoresInt.length; i++) {
    //     var sum = 0;
    //     for (j=0; j < friendsScoresInt[i].length; j++) {
    //         sum += Math.abs(scoresInt[j] - friendsScoresInt[j])
    //     }
    //     if (sum<highScore) {
    //         highScore= sum;
    //         bestFriend = friends[i];
    //     }
    // }
    for (i = 0; i < friends.length; i++) {
        var sum = 0;
        for (j = 0; j < friends[i].scores.length; j++) {
            sum += Math.abs(scoresInt[j] - friends[i].scores[j]);
        }
        if (sum < highScore) {
            highScore = sum;
            bestFriend = friends[i];
        }

    } console.log('Your friend is...');
    console.log(bestFriend);

    friends.push(newFriend);
    return res.json(bestFriend);
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
