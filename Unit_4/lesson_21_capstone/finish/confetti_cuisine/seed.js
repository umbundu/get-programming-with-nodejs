'use strict';

const mongoose = require( 'mongoose' ),
  Subscriber = require( './models/subscriber' ),
  User = require( './models/user' ),
  Course = require( './models/course' );

mongoose.connect( 'mongodb://localhost/confetti_cuisine' );
mongoose.connection;

var commands = [];

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
  } ];

Subscriber.remove( {} )
  .exec()
  .then( () => {
    console.log( 'Subscriber data is empty!' );
  } )
  .then( () => {
    users.forEach( ( c ) => {
      commands.push( Subscriber.create( {
        name: `${c.name.first} ${c.name.last}`,
        email: c.email,
        zipCode: c.zipCode
      } ) );
    } );
  } )
  .then( () => {
    return User.remove( {} )
      .exec();
  } )
  .then( () => {
    console.log( 'User data is empty!' );
  } )
  .then( () => {
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
  } )
  .then( () => {
    return Promise.all( commands );
  } )
  .then( r => {
    console.log( JSON.stringify( r ) );
    mongoose.connection.close();
  } )
  .catch( error => {
    console.log( `ERROR: ${error}` );
  } );
