var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var campground = require("./models/campground");
var seedDB     = require("./seed");
var comment    = require("./models/comment");

var passport = require("passport");
var local_strat = require("passport-local");
var user = require("./models/user");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });


// seedDB();


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/ public"));



//PASSPORT CONFIGURATION
// HTTP is stateless; in order to associate a request to any other request,
// you need a way to store user data between HTTP requests. Cookies and URL parameters 
// are both suitable ways to transport data between the client and the server. But they are 
// both readable and on the client side. Sessions solve exactly this problem. You assign the 
// client an ID and it makes all further requests using that ID. Information associated with 
// the client is stored on the server linked to this ID. therefore we need express-session
app.use(require("express-session")({
    secret: "mom is the best",
    resave: false,
    saveUninitialized: false
}));
// In a Connect or Express-based application, passport.initialize() middleware 
// is required to initialize Passport. If your application uses persistent 
// login sessions, passport.session() middleware must also be used.
app.use(passport.initialize());


// passport.session() acts as a middleware to alter the req object and 
// change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.
// Whilst the other answers make some good points I thought that some more specific detail could be provided.
// app.use(passport.session());
// is equivalent to
// app.use(passport.authenticate('session'));
// Where 'session' refers to the following strategy that is bundled with passportJS.

// https://github.com/jaredhanson/passport/blob/master/lib/strategies/session.js
app.use(passport.session());
//user.authenticate comes with passport-mongoose plugin, same for other 2
passport.use(new local_strat(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
   //get all campgrounds from db and render all the files
   campground.find({}, function(err, all_campgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/index",{campgrounds:all_campgrounds, currentUser:req.user})
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
           res.redirect("campgrounds/campgrounds");
       }
   })
  
    
});

app.get("/campgrounds/new",function(req,res){
   res.render("campgrounds/new.ejs"); 
});

app.get("/campgrounds/:id", function(req,res){
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


//=======================
// comment routes
//=======================

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
    //find campground by id
    campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
})


app.post("/campgrounds/:id/comments", isLoggedIn,function(req,res){
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

//===============================================
//AUTH ROUTES

//show register form
app.get("/register", function(req,res){
    res.render("register");
})


//handle sign up logic
app.post("/register", function(req,res){
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
app.get("/login", function(req, res) {
    res.render("login");
})

app.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
        
});

//logout route
app.get("/logout", function(req, res) {
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


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server started");
});