var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

//user - email, name
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});



//variable User using mongoose function with pre-defined Schema --- userSchema
// var User = mongoose.model("User", userSchema);


// post - title, content

//variable Post using mongoose function with pre-defined Schema --- postSchema
//var Post = mongoose.model("Post", postSchema);


var Post = require("./models/post");
var User = require("./models/user");



// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });


Post.create({
    title: "Harry Potter and Kayla pt.4",
    content: "Seng loves Kayla 3"
}, function(err, post){
    User.findOne({email:"bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, saved){
                if(err){
                     console.log(err);
                } else{
                    console.log(saved);
                }
               
            })
        }
    })
});


//find user
//find all post for that user

//find the user bob, and then populate (get all) the posts (which is id's array) and exec (which exec the code)
// User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });





// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// })

// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


//new user has a posts parameters, but we dont have to print it up in default empty.
// var newUser = new User({
//     email: "hermione@hogart.edu",
//     name: "hermione grang"
// })

// newUser.posts.push({
//     title: "how to brew polyjuice potion",
//     content: "Just kidding, go to potion class to learn it!"
// })

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })

// User.findOne({ name: "hermione grang" }, function(err, user) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         user.posts.push({
//             title: "3 things i really hate",
//             content: "vold, vold, vold"
//         });
//         user.save(function(err, user) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(user);
//             }
//         })
//     }
// });
