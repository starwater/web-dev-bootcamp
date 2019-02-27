var express = require("express");
var router = express.Router();
var campground = require("../models/campground")



router.get("", function(req,res){
   //get all campgrounds from db and render all the files
   campground.find({}, function(err, all_campgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/index",{campgrounds:all_campgrounds, currentUser:req.user})
       }
   })
});

router.post("", isLoggedIn,function(req,res){
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

router.get("/new", isLoggedIn,function(req,res){
   res.render("campgrounds/new.ejs"); 
});

router.get("/:id", function(req,res){
    //find the campground with provided id
    //render show template with that campground, so we proabably render only one campground this page
    campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render the show template
            //console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
