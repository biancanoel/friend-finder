var friends = require('../app/data/friends.js');
var path = require("path");

module.exports = function (app) {
    app.get('/friends'), function (req,res) {
        res.json(friends);
    };

    app.post("/api/new", function (req, res) {
        var newFriend = req.body;
      
        var scoresInt = [];
        newFriend.scores.forEach(function (score) {
            scoresInt.push(parseInt(score));
        })
    
        //Determine best friend match 
        var highScore = 1000;
        var bestFriend;
    
        for (i = 0; i < friends.length; i++) {
            var sum = 0;
            for (j = 0; j < friends[i].scores.length; j++) {
                sum += Math.abs(scoresInt[j] - friends[i].scores[j]);
            }
            if (sum < highScore) {
                highScore = sum;
                bestFriend = friends[i];
            };
        }; 
    
        friends.push(newFriend);
        return res.json(bestFriend);
    });
}