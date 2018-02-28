'use strict';

const port = 3000,
  express = require( 'express' ),
  app = express();

app.listen( port, () => {
  console.log( `Server running on port: ${port}` );
} );
