'use strict';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),

  homeController = require('./controllers/homeController'),
  errorController = require('./controllers/errorController'),
  subscriberController = require('./controllers/subscribersController'),

  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),

  Subscriber = require('./models/subscriber');

mongoose.connect('mongodb://localhost/recipe_db');
var db = mongoose.connection;

db.once('open', () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/subscribers', subscriberController.getAllSubscribers, (req, res) => {
  console.log(req.data);
  res.send(req.data);
});

app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/contact', homeController.postedContactForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
