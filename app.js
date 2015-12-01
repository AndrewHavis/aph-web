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

// Go to the appropriate environment
var env = app.get('env');
console.log('Using the ' + env + ' environment.');
if (env === 'development') {
    // serve the files out of ./dev as our development files
    app.use(express.static(__dirname + '/dev'));
}
else {
    // serve the files out of ./public as our main files    
    app.use(express.static(__dirname + '/public'));
}

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

// Import Twitter API
var Twitter = require('twitter');
var twitter = new Twitter({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token_key: credentials.twitter.access_token,
    access_token_secret: credentials.twitter.access_secret
});

// Retrieve username to see if Flickr API is working
flickr.get('people.getInfo', {"user_id": flkrKeys.user_id}, function(err, result) {
    if (!err) {
        console.log('Using photostream of Flickr user \'' + result.person.username._content + '\'');
    }
    else {
        console.error('ERROR: Cannot access Flickr API\n' + err);
    }
});

// Also retrieve username from Twitter API
twitter.get('users/show', {"user_id": credentials.twitter.user_id}, function(err, result) {
    if (!err) {
        console.log('Twitter username: @' + result.screen_name);
    }
    else {
        console.error('ERROR: Cannot access Twitter API\n' + err);
    }
});



// get bower libraries
app.use('/lib', express.static(__dirname + '/bower_components'));

// Flickr API
app.post('/api/flickr/photos', function(req, res) {
    flickr.get('people.getPublicPhotos', {"user_id": flkrKeys.user_id, "extras": "url_t, url_m, url_l, url_o"}, function(err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.error('ERROR: Cannot access Flickr API\n' + err);
        }
    });
});

app.post('/api/flickr/set/:setId', function(req, res) {
    flickr.get('photosets.getPhotos', {"photoset_id": req.params.setId, "user_id": flkrKeys.user_id, "extras": "url_l", "media": "photos"}, function(err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.error('ERROR: Cannot access Flickr API\n' + err);
        }
    });
});

app.post('/api/twitter/me', function(req, res) {
    twitter.get('users/show', {"user_id": credentials.twitter.user_id}, function(err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.error('ERROR: Cannot access Twitter API\n' + err);
        }
    });
});

app.post('/api/twitter/tweets', function(req, res) {
    twitter.get('statuses/user_timeline', {"user_id": credentials.twitter.user_id, count: 5, include_rts: true}, function(err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.error('ERROR: Cannot access Twitter API\n' + err);
        }
    });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
