var express = require("express");
var router = express.Router({mergeParams:true});
var campground = require("../models/campground");
var comment= require("../models/comment")


router.get("/new",isLoggedIn, function(req,res){
    //find campground by id
    campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
})


router.post("", isLoggedIn,function(req,res){
    //look up camp id
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    // add user name and id to comment and save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log("new comment's username will be : "+req.user.username)
                    //save comment
                    campground.comments.push(comment);
                    campground.save();
                    // /campgrounds/id
                    console.log(comment);
                    res.redirect("/campgrounds/"+ campground._id);
                }
            })
        }
    })
})

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

    
    //create new comment
    //connect new comment to campground
    //redirect to show page
module.exports = router;