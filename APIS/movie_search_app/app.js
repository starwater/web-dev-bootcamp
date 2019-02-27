var express = require("express");
var app = express();

var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("search");
})


app.get("/results", function(req,res){
    var search_term = req.query.search;
    var link = "http://www.omdbapi.com/?s="+search_term+"&apikey=thewdb&year%3E2008";
    request( link, function(error,response,body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            //res.send(parsedData["Search"][0]["Title"]);
            res.render("results",{data:parsedData});
        }
    });
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie API Server started!!! :X");
})