var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

//user - email, name
var postSchema = new mongoose.Schema({
    title: String,
    content: String
})

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

var User = mongoose.model("User", userSchema);


// post - title, content


var Post = mongoose.model("Post", postSchema);


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

User.findOne({ name: "hermione grang" }, function(err, user) {
    if (err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "3 things i really hate",
            content: "vold, vold, vold"
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        })
    }
});
