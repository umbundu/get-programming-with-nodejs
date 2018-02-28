'use strict';

const mongoose = require( 'mongoose' ),
  Subscriber = require( './models/subscriber' ),
  User = require( './models/user' ),
  Course = require( './models/course' );

mongoose.connect( 'mongodb://localhost/recipe_db' );
mongoose.connection;

var commands = [];

// SUBSCRIBERS
var contacts = [
  {
    name: 'Jon Wexler',
    email: 'jon@jonwexler.com',
    zipCode: 10016
  },
  {
    name: 'Chef Eggplant',
    email: 'eggplant@recipeapp.com',
    zipCode: 20331
  },
  {
    name: 'Professor Souffle',
    email: 'souffle@recipeapp.com',
    zipCode: 19103
  } ];

Subscriber.remove( {} )
  .exec()
  .then( () => {
    console.log( 'Subscriber data is empty!' );
  } );


contacts.forEach( ( c ) => {
  commands.push( Subscriber.create( {
    name: c.name,
    email: c.email
  } ) );
} );


// USERS
var users = [
  {
    name: {
      first: 'Jon',
      last: 'Wexler',
    },
    email: 'jon@jonwexler.com',
    zipCode: 10016,
    password: '12345'
  },
  {
    name: {
      first: 'Chef',
      last: 'Eggplant',
    },
    email: 'eggplant@recipeapp.com',
    zipCode: 20331,
    password: '12345'
  },
  {
    name: {
      first: 'Professor',
      last: 'Souffle',
    },
    email: 'souffle@recipeapp.com',
    zipCode: 19103,
    password: '12345'
  }
];

User.remove( {} )
  .exec()
  .then( () => {
    console.log( 'User data is empty!' );
  } );


users.forEach( ( u ) => {
  commands.push( User.create( {
    name: {
      first: u.name.first,
      last: u.name.last,
    },
    email: u.email,
    zipCode: u.zipCode,
    password: u.password
  } ) );
} );

Promise.all( commands )
  .then( r => {
    console.log( JSON.stringify( r ) );
    mongoose.connection.close();
  } )
  .catch( error => {
    console.log( `ERROR: ${error}` );
  } );
