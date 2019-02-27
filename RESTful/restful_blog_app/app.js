var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express(),
    override    = require("method-override"),
    expressSanitizer   = require("express-sanitizer")
    
    //app config
    mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
    app.set("view engine", "ejs");
    //this directs check this folder "public" and look for css etc
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(expressSanitizer());
    app.use(override("_method"));
    
    
    //mongoose / model config
    var blog_schema = new mongoose.Schema({
        title: String,
        image: String,
        body: String,
        created: {type:Date, default: Date.now}
    });
    var blog = mongoose.model("blog",blog_schema);
    
    
    //RESTful ROUTES
    // blog.create({
    //     title: "Hao Lan",
    //     image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=4bc9ddbb59e736d14c1e845afa3924a7/574e9258d109b3de6f45770fc1bf6c81810a4cdb.jpg",
    //     body: "The Legend of Haolan (Chinese: 皓镧传) is a 2019 Chinese television series starring Wu Jinyan, Mao Zijun and Nie Yuan. The series is slated for broadcast on iQiyi on January 19, 2019.",
    // });
    
    //get route
     app.get("/", function(req,res){
        res.redirect("/blogs");
    });
    //index
    app.get("/blogs", function(req,res){
        blog.find({}, function(err,blogs){
            if(err){
                console.log(err);
            } else {
                res.render("index",{blogs:blogs});
            }
        })
        // res.render("index");
    });
    
    //new route
    app.get("/blogs/new", function(req,res){
        res.render("new");
    });
    
    //create route
    app.post("/blogs", function(req,res){
        //create blog
        console.log(req.body.blog.body);
        req.body.blog.body = req.sanitize(req.body.blog.body);
        console.log("===========================")
        console.log(req.body);
        blog.create(req.body.blog,function(err,newblog){
            if(err){
                res.render("new");
            }else{
                res.redirect("/blogs");
            }
        })
        //redirtect to index
    })
    
    //show route
    //show template
    //links to show page
    //style show template
    app.get("/blogs/:id", function(req,res){
        blog.findById(req.params.id, function(err, foundblog){
            if(err){
                res.redirect("/blogs");
            } else{
                res.render("show", {blog:foundblog});
            }
        })
    })
    
    // title
    // image
    // body content
    // created date
    
    
    //edit and update
    app.get("/blogs/:id/edit", function(req,res){
        req.body.blog.body = req.sanitize(req.body.blog.body);
        blog.findById(req.params.id, function(err, foundblog){
            if(err){
                res.redirect("/blogs");
            } else {
                res.render("edit", {blog:foundblog});
            }
        })
        // res.render("edit");
    })
    
    //update route
    app.put("/blogs/:id", function(req,res){
        blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedblog){
            if(err){
                res.redirect("/blogs");
            } else {
                res.redirect("/blogs/"+ req.params.id);
            }
        })
    })
    
    
    
    //delete route
    //need id, _method, redirect to index but careful for the only left
    app.delete("/blogs/:id", function(req,res){
        //destroy blog
        blog.findByIdAndRemove(req.params.id,function(err){
            if(err){
                res.redirect("/blogs");
            } else {
                res.redirect("/blogs");
            }
        //redirect to index
        // res.send("You have reach the destroy route");
    })
});

//sanitize blog body
//style index page a bit
//update restful table

    

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
})
    