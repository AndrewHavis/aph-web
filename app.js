/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Get credentials from Cloud Foundry, or credentials.json if running locally
if (!!appEnv.isLocal) {
    console.log('Running locally');
    var credentials = require('./credentials.json');
}
else {
    console.log('Running on Bluemix');
    var credentials = appEnv.getServices();
}

// Import Flickr API
var Flickr = require('node-flickr');
var flkrKeys = credentials.flickr;
var flickr = new Flickr(flkrKeys);

// Retrieve username to see if Flickr API is working
flickr.get('people.getInfo', {"user_id": flkrKeys.user_id}, function(err, result) {
    if (!err) {
        console.log('Using photostream of Flickr user \'' + result.person.username._content + '\'');
    }
    else {
        console.log('ERROR: Cannot access Flickr API\n' + err);
    }
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get bower libraries
app.use('/lib', express.static(__dirname + '/bower_components'));

// Flickr API
app.use('/api/flickr', function(req, res) {
    flickr.get('people.getPublicPhotos', {"user_id": flkrKeys.user_id, "extras": "url_l"}, function(err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log('ERROR: Cannot access Flickr API\n' + err);
        }
    });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
