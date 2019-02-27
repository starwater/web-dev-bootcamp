var mongoose = require("mongoose");
var passport_local_mongoose = require("passport-local-mongoose"); //1

var user_schema = new mongoose.Schema({
    username: String,
    password: String
})

user_schema.plugin(passport_local_mongoose);//1 this plugin adds to the model user

module.exports = mongoose.model("User", user_schema);