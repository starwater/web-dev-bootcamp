var mongoose = require("mongoose");

//user - email, name
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// var Post = mongoose.model("Post", postSchema);

module.exports = mongoose.model("Post", postSchema);