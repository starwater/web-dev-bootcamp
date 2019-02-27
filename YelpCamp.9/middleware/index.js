// all the middleware goes here
var campground = require("../models/campground");
var campground = require("../models/comment");


var middlewareObj={};

middlewareObj.check_ownership = function(req,res,next){
     if(req.isAuthenticated()){
         //does user own the campground?
        campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            res.redirect("back")
        }else{
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back")
            }
        }
        })
        //else if not authenticate
    } else {
        //if not redirect elsewhere
        console.log("ur not logged in")
        res.redirect("back")
    }
}

middlewareObj.check_comment_ownership = function(req,res,next){
     if(req.isAuthenticated()){
         //does user own the campground?
        comment.findById(req.params.comment_id, function(err,foundcomment){
        if(err){
            res.redirect("back")
        }else{
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back")
            }
        }
        })
        //else if not authenticate
    } else {
        //if not redirect elsewhere
        console.log("ur not logged in")
        res.redirect("back")
    }
}


middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj