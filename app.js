/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// Get our credentials from the server environment variables
const credentials = require('./modules/credentials').credentials;

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');

// create a new express server
const app = express();
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal', '159.8.128.116']); // Used to get remote IP address rather than that of the proxy

// Universal analytics
const ua = require('universal-analytics');
const uuid = require('uuid').v4();
const visitor = ua('UA-25684096-2');

// Set up our environment
require('./modules/environment').setUpEnvironment(express, app, (environment) => {

    // Set up our port number
    const port = 8080;

    // Set up our Flickr routes
    require('./modules/routes/flickr').setUpFlickrRoutes(credentials.flickr, app);

    // Set up our Twitter routes
    require('./modules/routes/twitter').setUpTwitterRoutes(credentials.twitter, app);

    // get bower libraries
    app.use('/lib', express.static(__dirname + '/bower_components'));
    
    // Get the files from /dev or /public as appropriate
    if (environment === 'public') {
        // serve the files out of ./public as our main files and initalise universal analytics
        app.use(express.static(__dirname + '/public'), function(req, res, next) {
            visitor.pageview({dp: "/", dt: "andrew-havis.co.uk", dh: "http://andrew-havis.co.uk/", cid: uuid, uip: req.headers['x-client-ip'] || req.headers['x-forwarded-for'] || req.ip, ua: req.headers['user-agent']}).send();
            next();
        });
    }
    else {
        app.use(express.static(__dirname + '/dev'));
    }

    app.get('/test', function(req, res) {
        res.set('Content-Type', 'application/json');
        res.send({'test':'This is a test page.'});
    });

    // start server on the specified port and binding host
    app.listen(port, '0.0.0.0', function() {
        // print a message when the server starts listening
        console.log('Running the ' + environment + ' environment');
        console.log('Server starting on port ' + port);
    });

});
