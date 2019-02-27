var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

for(var i=0; i<10; i++){
    var randomProd = faker.commerce.productName();
    var randomPrice = faker.commerce.price();
    console.log(randomProd+ ": " + randomPrice);    
}
