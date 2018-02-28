'use strict';

const routeResponseMap = {

  },
  port = 3000,
  http = require( 'http' ),
  httpStatus = require( 'http-status-codes' ),
  app = http.createServer( ( req, res ) => {
    res.writeHead( httpStatus.OK, {
      'Content-Type': 'text/html'
    } );

    if ( routeResponseMap[ req.url ] ) {
      res.end( routeResponseMap[ req.url ] );
    } else {
      res.end( '<h1>Welcome!</h1>' );
    }
  } );

app.listen( port );

console.log( `The server has started and is listening on port number: ${port}` );
