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

var commentRoutes     = require("./routes/comments");
var campgroundtRoutes = require("./routes/campgrounds")
var indexRoutes        = require("./routes/index")



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


app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundtRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server started");
});