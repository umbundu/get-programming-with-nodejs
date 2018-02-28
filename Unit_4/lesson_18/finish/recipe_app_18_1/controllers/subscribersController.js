'use strict';

const Subscriber = require( '../models/subscriber' );

module.exports = {

  getAllSubscribers: ( req, res ) => {
    Subscriber.find( {} )
      .exec()
      .then( ( subscribers ) => {
        res.render( 'subscribers', {
          subscribers: subscribers
        } );
      } )
      .catch( ( error ) => {
        console.log( error.message );
        return [];
      } )
      .then( () => {
        console.log( 'promise complete' );
      } );
  },

  getSubscriptionPage: ( req, res ) => {
    res.render( 'contact' );
  },

  saveSubscriber: ( req, res ) => {
    let newSubscriber = new Subscriber( {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    } );

    newSubscriber.save()
      .then( result => {
        res.render( 'thanks' );
      } )
      .catch( error => {
        if ( error ) res.send( error );
      } );
  }
};
