var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var campground = require("./models/campground");
var seedDB     = require("./seed");
var comment    = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });


seedDB();


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
   //get all campgrounds from db and render all the files
   campground.find({}, function(err, all_campgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("index",{campgrounds:all_campgrounds})
       }
   })
});

app.post("/campgrounds",function(req,res){
   //get data from form and add to campground array
   //redirect back to campgrounds page
   var name = req.body.name;
   var image = req.body.image;
   var disc = req.body.description;
   var newcampground = {name: name, image:image, description:disc};
   campground.create(newcampground, function(err,new_campground){
       if(err){
           console.log("Error: "+err);
       } else{
           console.log("New camp item created!");
           res.redirect("/campgrounds");
       }
   })
  
    
});

app.get("/campgrounds/new",function(req,res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    //render show template with that campground, so we proabably render only one campground this page
    campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render the show template
            console.log(foundCampground);
            res.render("show",{campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server started");
});