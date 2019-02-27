var mongoose   = require("mongoose");

var campground_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        ]
})

var campground = mongoose.model("campground", campground_schema);

module.exports = campground;