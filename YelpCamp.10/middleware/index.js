// all the middleware goes here
var campground = require("../models/campground");
var comment = require("../models/comment");


var middlewareObj={};

middlewareObj.check_ownership = function(req,res,next){
     if(req.isAuthenticated()){
         //does user own the campground?
        campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back")
        }else{
            // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back")
            }
        }
        })
        //else if not authenticate
    } else {
        //if not redirect elsewhere
        req.flash("error", "You need to be logged in to do that");
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
            
            // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!foundcomment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back")
            }
        }
        })
        //else if not authenticate
    } else {
        //if not redirect elsewhere
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back")
    }
}


middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("please log in first");
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj