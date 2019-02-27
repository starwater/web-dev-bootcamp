var express = require("express");
var app = express();

// "/" => "Hi there!"

app.get("/", function(req,res){
    res.send("Hi there!");
});

app.get("/bye",function(req,res){
    res.send("Goodbye!");
});
// "/bye" => "Goodbye!"

app.get("/dog",function(req,res){
    console.log("someone made a request to /dog")
    res.send("MEOW!");
});
// "/dog" => "MEOW!"

app.get("/cat",function(req,res){
    console.log("someone made a request to /dog")
    res.send("ROUGH!");
});

app.get("/cry",function(req,res){
    console.log("someone made a request to /dog")
    res.send("EWWWW!");
});

//cloud 9 port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
// '--save' to save the current version into package.json file
// 'npm init' to create a new package.json

//path variables, route variables, '  :  '
app.get("/r/:subredditName", function(req,res){
    var subreddit = req.params.subredditName;
    console.log(req.params);
    res.send("Welcome to the "+subreddit+" SUBREDDIT!");
})

app.get("/r/:subredditName/comments/:id/:title/", function(req,res){
    console.log(req.params);
    res.send("Welcome to SUBREDDIT comment!");
})


app.get("*", function(req,res){
    res.send("Page not found!");
});

