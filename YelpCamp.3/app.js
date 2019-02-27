var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var campground = require("./models/campground");
var seedDB     = require("./seed");
var comment    = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });





app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

seedDB();


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
   //get all campgrounds from db and render all the files
   campground.find({}, function(err, all_campgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/index",{campgrounds:all_campgrounds})
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

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});


// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//=======================
// comment routes
//=======================

app.get("/campgrounds/:id/comments/new", function(req,res){
    //find campground by id
    campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log("comment routes err");
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
})


app.post("/campgrounds/:id/comments", function(req,res){
    //look up camp id
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("post comment routes err");
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log("post comment route err 2");
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    // /campgrounds/id
                    res.redirect("/campgrounds/"+ campground._id);
                }
            })
        }
    })
})
    
    //create new comment
    //connect new comment to campground
    //redirect to show page
    


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server v.3 started");
});