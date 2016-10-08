'use strict';

// A module to build a credentials object from the relevant environment variables
const dotenv = require('dotenv').config();
let credentials = {};
credentials.twitter = {};
credentials.twitter.user_id = process.env.twitter_user_id;
credentials.twitter.consumer_key = process.env.twitter_consumer_key;
credentials.twitter.consumer_secret = process.env.twitter_consumer_secret;
credentials.twitter.access_token = process.env.twitter_access_token;
credentials.twitter.access_secret = process.env.twitter_access_secret;
credentials.flickr = {};
credentials.flickr.user_id = process.env.flickr_user_id;
credentials.flickr.photoset_id = process.env.flickr_photoset_id;
credentials.flickr.api_key = process.env.flickr_api_key;
credentials.flickr.secret = process.env.flickr_secret;
credentials.google_analytics = {};
credentials.google_analytics.account_id = process.env.google_analytics_account_id;

// Return our credentials object
module.exports.credentials = credentials;