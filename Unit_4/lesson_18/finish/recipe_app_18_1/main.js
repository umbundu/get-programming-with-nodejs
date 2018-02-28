'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),

  homeController = require( './controllers/homeController' ),
  errorController = require( './controllers/errorController' ),
  subscribersController = require( './controllers/subscribersController' ),

  bodyParser = require( 'body-parser' ),
  mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost/recipe_db' );
const db = mongoose.connection;

db.once( 'open', () => {
  console.log( 'Successfully connected to MongoDB using Mongoose!' );
} );

app.set( 'port', process.env.PORT || 3000 );

app.set( 'view engine', 'ejs' );
app.use( layouts );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( bodyParser.json() );

app.get( '/', ( req, res ) => {
  res.render( 'index' );
} );

app.get( '/subscribers', subscribersController.getAllSubscribers );
app.get( '/contact', subscribersController.getSubscriptionPage );
app.post( '/subscribe', subscribersController.saveSubscriber );

app.get( '/courses', homeController.showCourses );

app.use( errorController.pageNotFoundError );
app.use( errorController.internalServerError );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );
