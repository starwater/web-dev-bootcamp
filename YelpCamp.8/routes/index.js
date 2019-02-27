var express = require("express");
var router = express.Router();
var campground = require("../models/campground")
var passport = require("passport");
var user = require("../models/user");



router.get("/", function(req,res){
    res.render("landing");
});


//=======================
// comment routes
//=======================

//===============================================
//AUTH ROUTES

//show register form
router.get("/register", function(req,res){
    res.render("register");
})


//handle sign up logic
router.post("/register", function(req,res){
    //pass in the new user object with username
    var newuser = new user({username: req.body.username});
    //then the register take care of the password hashing
    user.register(newuser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            //if cannot create new user provided username ish, redirect to regiter page?
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
        
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;