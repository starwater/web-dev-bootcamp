var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");


var data = [
        // {
        //     name: "cloud's rest",
        //     image: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.0-9/28379158_10156917663238492_4464138064041678931_n.jpg?_nc_cat=100&_nc_ht=scontent.fyyc2-1.fna&oh=a3c35d35d40ff4d5ed9373f7d168c43b&oe=5D281C25",
        //     description: "blah blah blah blah"
        // },
        // {
        //     name: "dragon's breath",
        //     image: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.0-9/37798950_10157271776808492_2959042728173764608_n.jpg?_nc_cat=111&_nc_ht=scontent.fyyc2-1.fna&oh=74521f2b849c0c369428e15b71ba3a76&oe=5CDDF647",
        //     description: "blah blah blah blah"
        // },
        // {
        //     name: "amelia's fate",
        //     image: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.0-9/16603043_10155552855598492_7154940892782729338_n.jpg?_nc_cat=105&_nc_ht=scontent.fyyc2-1.fna&oh=eb892ec96165bbf1c35a54ecfc194e47&oe=5D1CAB58",
        //     description: "blah blah blah blah"
        // }
         {
            name: "cloud's rest",
            image: "https://images.unsplash.com/photo-1550880198-56c05ed29c30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Then cats take over the world. Hide at bottom of staircase to trip human human is washing you why halp oh the horror flee scratch hiss bite and lick arm hair and sniff other cat's butt and hang jaw half open thereafter hiss and stare at nothing then run suddenly away hide head under blanket so no one can see scratch. Put toy mouse in food bowl run out of litter box at full speed scratch the furniture cat fur is the new black . Catty ipsum lick butt, so mrow but pet my belly, you know you want to; seize the hand and shred it!. Weigh eight pounds but take up a full-size bed do not try to mix old food with new one t"
        },
        {
            name: "dragon's breath",
            image: "https://images.unsplash.com/photo-1550865811-d7814cebc70c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Then cats take over the world. Hide at bottom of staircase to trip human human is washing you why halp oh the horror flee scratch hiss bite and lick arm hair and sniff other cat's butt and hang jaw half open thereafter hiss and stare at nothing then run suddenly away hide head under blanket so no one can see scratch. Put toy mouse in food bowl run out of litter box at full speed scratch the furniture cat fur is the new black . Catty ipsum lick butt, so mrow but pet my belly, you know you want to; seize the hand and shred it!. Weigh eight pounds but take up a full-size bed do not try to mix old food with new one t"
        },
        {
            name: "amelia's fate",
            image: "https://images.unsplash.com/photo-1550874613-8420c2f98db9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            description: "Then cats take over the world. Hide at bottom of staircase to trip human human is washing you why halp oh the horror flee scratch hiss bite and lick arm hair and sniff other cat's butt and hang jaw half open thereafter hiss and stare at nothing then run suddenly away hide head under blanket so no one can see scratch. Put toy mouse in food bowl run out of litter box at full speed scratch the furniture cat fur is the new black . Catty ipsum lick butt, so mrow but pet my belly, you know you want to; seize the hand and shred it!. Weigh eight pounds but take up a full-size bed do not try to mix old food with new one t"
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