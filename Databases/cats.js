var mongoose = require("mongoose");
//cat_app database will be created if not found
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });



//doesnt effect the database, it only tells mongoose, a cat should be define as this
//defining a pattern for data/ predictable structure
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
//took the schema, compiled it into a model and saves to Cat with capital C
//it compress the model that we needed to use  model( collection cat, schema)
var Cat = mongoose.model("Cat", catSchema);


var george = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
});
//(err,save)
// george.save(function(err, cat){
//     if(err){
//         console.log("something went wrong!");
//     }else{
//         console.log("we just saved a cat to the db:");
//         console.log(cat);
//     }
// });

//find method
Cat.find({}, function(err, cats){
    if(err){
        console.log("oh no, find error!");
        console.log(err);
    } else {
        console.log("All the cats...");
        console.log(cats);
    }
});

//new and save all at once
Cat.create({
   name : "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err,cat){
    if(err){
        console.log("Error: "+error);
    } else{
        console.log("Cat: "+cat);
    }
});
//Cat.find  Cat.remove, Cat.create

//retrieve all cats from the DB and console.log each one
