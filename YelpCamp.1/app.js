var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//schema setup

var campground_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var campground = mongoose.model("campground", campground_schema);

// campground.create(
//          {  name: "Kayla", 
//             image:"https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//             description: "huge granite hill, cold and beautiful"
//         }, function(err, campground){
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log("newly created campground");
//                 console.log(campground);
//             }
//         })
    
    
//db.collection.drop()


var campgrounds = [
        {name: "Amy", image:"https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        {name: "Kayla", image:"https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        {name: "Jenny", image:"https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        {name: "Amy", image:"https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        {name: "Kayla", image:"https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
        {name: "Jenny", image:"https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}
       ] 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
   //get all campgrounds from db and render all the files
   campground.find({}, function(err, all_campgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("index",{campgrounds:all_campgrounds})
       }
   })
    //res.render("campgrounds",{campgrounds:campgrounds});
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
   //campgrounds.push(newcampground);
  
    
});

app.get("/campgrounds/new",function(req,res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    //render show template with that campground, so we proabably render only one campground this page
    campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render the show template
            res.render("show",{campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server started");
});