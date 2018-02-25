// SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipe_db');
mongoose.Promise = global.Promise;
const Subscriber = require('./models/subscriber');

//COMMANDS
Subscriber.create({
  name: 'Jon',
  email: 'info@jonwexler.com',
  zipCode: '12345'
})
  .then(subscriber => {
    console.log(subscriber.getInfo());
  })
  .catch(error => console.log(error.message));

var subscriber;

Subscriber.findOne({
  name: 'Jon'
})
  .then(result => {
    subscriber = result;
    console.log(subscriber.getInfo());
  });

//MODEL ASSOCIATIONS
const Course = require('./models/course');

var testCourse,
  testSubscriber;

Course.create({
  title: 'Tomato Land',
  description: 'Locally farmed tomatoes only',
  zipCode: 12345,
  items: ['cherry', 'heirloom']
})
  .then(c => {
    testCourse = c;
    Subscriber.findOne({})
      .then(s => {
        testSubscriber = s;
        testSubscriber.courses.push(testCourse);
        testSubscriber.save()
          .then( () => {
            Subscriber.populate(testSubscriber, 'courses')
              .then(s2 => console.log(s2));
          });
      });
  });

// Course.findOne().then(g => testCourse = g);
