const mongoose = require('mongoose'),
  Subscriber = require('./models/subscriber');

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

var contacts = [{
    name: "Jon Wexler",
    email: "jon@jonwexler.com"
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com"
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com"
  }
];

Subscriber.remove({}, (removed) => {
  console.log("Subscriber data is empty!");
});

var commands = []

contacts.forEach((c) => {
  commands.push(Subscriber.create({
    name: c.name,
    email: c.email
  }));
})

Promise.all(commands).then((r) => {
  console.log(JSON.stringify(r));
  mongoose.connection.close();
})
