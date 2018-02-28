'use strict';

const port = 3000,
  http = require( 'http' ),
  httpStatus = require( 'http-status-codes' ),
  app = http.createServer();

app.listen( port );
console.log( `The server has started and is listening on port number: ${port}` );
