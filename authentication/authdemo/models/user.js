var mongoose = require("mongoose");
var passport_mongoose = require("passport-local-mongoose");

var user_schema = new mongoose.Schema({
    username: String,
    passpord: String
})

user_schema.plugin(passport_mongoose);

module.exports = mongoose.model("user", user_schema);