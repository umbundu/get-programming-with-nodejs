'use strict';

const port = 3000,
  http = require( 'http' ),
  httpStatus = require( 'http-status-codes' ),
  router = require( './router' ),
  fs = require( 'fs' ),
  contentTypes = require( './content-types' ),
  utils = require( './utils' );

http.createServer( router.handle )
  .listen( port );
console.log( `The server has started and is listening on port number: ${port}` );
