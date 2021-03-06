/* jshint node: true */

module.exports = function( environment ) {
  var ENV = {
    modulePrefix: 'embtest',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV[ 'ember-simple-auth' ] = {
    store: 'ember-simple-auth-session-store:local-storage',
    authorizer: 'authorizer:custom',
    authenticationRoute: 'login',
    crossOriginWhitelist: [ 'http://localhost:3000/' ],
    routeAfterAuthentication: 'dashboard'
  };

  if ( environment === 'development' ) {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV[ 'ember-simple-auth' ] = {
      authenticationRoute: 'login',
      serverTokenEndpoint: 'http://localhost:3000/login',
      routeAfterAuthentication: 'dashboard'
    }
  }

  if ( environment === 'test' ) {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if ( environment === 'production' ) {

  }

  return ENV;
};
