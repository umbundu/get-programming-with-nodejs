'use strict';

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  app = express(),
  homeController = require('./controllers/homeController'),
  errorController = require('./controllers/errorController'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipe_db');
const db = mongoose.connection,
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  }),
  Subscriber = mongoose.model('Subscriber', subscriberSchema);

var subscriber1 = new Subscriber({
  name: 'Jon Wexler',
  email: 'jon@jonwexler.com'
});

subscriber1.save((error, savedDocument, next) => {
  if (error) next(error);
  console.log(savedDocument);
});

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!');
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

app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/contact', homeController.postedContactForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
