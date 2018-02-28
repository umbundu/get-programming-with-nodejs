'use strict';

const express = require( 'express' ),
  app = express(),
  homeController = require( './controllers/homeController' );

app.set( 'port', process.env.PORT || 3000 );

app.use( homeController.logRequestPaths );

app.get( '/items/:vegetable', homeController.sendReqParam );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running on port: ${app.get('port')}` );
} );
