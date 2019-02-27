var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");


var data = [
        {
            name: "cloud's rest",
            image: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.0-9/28379158_10156917663238492_4464138064041678931_n.jpg?_nc_cat=100&_nc_ht=scontent.fyyc2-1.fna&oh=a3c35d35d40ff4d5ed9373f7d168c43b&oe=5D281C25",
            description: "blah blah blah blah"
        },
        {
            name: "dragon's breath",
            image: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.0-9/37798950_10157271776808492_2959042728173764608_n.jpg?_nc_cat=111&_nc_ht=scontent.fyyc2-1.fna&oh=74521f2b849c0c369428e15b71ba3a76&oe=5CDDF647",
            description: "blah blah blah blah"
        },
        {
            name: "amelia's fate",
            image: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.0-9/16603043_10155552855598492_7154940892782729338_n.jpg?_nc_cat=105&_nc_ht=scontent.fyyc2-1.fna&oh=eb892ec96165bbf1c35a54ecfc194e47&oe=5D1CAB58",
            description: "blah blah blah blah"
        }
    ]

function seedDB(){
    campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!");
    })
    comment.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed comments!");
    })
    data.forEach(function(seed){
        campground.create(seed, function(err,campground){
            if(err){
                console.log(err)
            } else {
                console.log("added campground");
                comment.create(
                    {
                        text: "This place is great, but i wish there was internet",
                        author: "Homer"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment!");
                        }
                       
                    });
            }
        })
    })
}

module.exports = seedDB;