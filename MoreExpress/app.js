var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(req,res){
    //redner(<filename>);
    res.render("home.ejs");
    //res.send("Welcome to the homepage");
});


app.get("/fallinlovewith/:thing",function(req,res){
    var thing = req.params.thing;
    //res.send("You fall in love with "+thing);
    //render(".ejs",{term : refer to})
    res.render("love.ejs", {thingVar:thing});
})

app.get("/posts", function(req,res){
    var posts = [
            {title: "Post1", author: "Susy"},
            {title: "Post2", author: "Kayla"},
            {title: "Post3", author: "Alice"}
        ]
    res.render("posts.ejs",{posts:posts});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!");
})