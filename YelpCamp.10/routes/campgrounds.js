var express = require("express");
var router = express.Router();
var campground = require("../models/campground")
var middleware = require("../middleware")



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

router.post("/", middleware.isLoggedIn,function(req,res){
   //get data from form and add to campground array
   //redirect back to campgrounds page
   var name = req.body.name;
   var image = req.body.image;
   var disc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newcampground = {name: name, image:image, description:disc, author:author};
   //console.log(req.user);
   campground.create(newcampground, function(err,new_campground){
       if(err){
           console.log("Error: "+err);
       } else{
           console.log("New camp item created!");
           console.log(new_campground);
           res.redirect("/campgrounds");
       }
   })
  
    
});

router.get("/new", middleware.isLoggedIn,function(req,res){
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.check_ownership,function(req,res){
    campground.findById(req.params.id, function(err,foundCampground){
        res.render(("campgrounds/edit"), {campground:foundCampground});
    });
});
  


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.check_ownership, function(req,res){
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updated){
        if(err){
            res.redirect("campground");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.check_ownership, function(req,res){
    campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;
