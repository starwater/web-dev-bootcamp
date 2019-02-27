var express = require("express");
var router = express.Router({mergeParams:true});
var campground = require("../models/campground");
var comment= require("../models/comment");
var middleware = require("../middleware");


router.get("/new",middleware.isLoggedIn, function(req,res){
    //find campground by id
    campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
})


router.post("", middleware.isLoggedIn,function(req,res){
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


//EDIT COMMENTS ROUTE
router.get("/:comment_id/edit", middleware.check_comment_ownership, function(req,res){
    comment.findById(req.params.comment_id, function(err, foundcomment) {
        if(err){
            res.redirect("back")
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment:foundcomment});
        }
    })
    
})

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.check_comment_ownership,function(req,res){
   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedcomment){
       if(err){
           res.redirect("back")
       }else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   })
});


//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.check_comment_ownership, function(req,res){
   comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   })
})

module.exports = router;