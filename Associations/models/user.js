var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            //object reference id belonging to a post
            ref: "Post"
        }
    ]
});

 var User = mongoose.model("User", userSchema);
module.exports = User;