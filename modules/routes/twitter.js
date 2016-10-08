'use strict';

module.exports.setUpTwitterRoutes = (credentials, app) => {
    const Twitter = require('twitter');
    const twitter = new Twitter({
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        access_token_key: credentials.access_token,
        access_token_secret: credentials.access_secret
    });
    
    app.post('/api/twitter/me', (req, res) => {
        twitter.get('users/show', {"user_id": credentials.user_id}, (err, result) => {
            if (!err) {
                res.send(result);
            }
            else {
                console.error('ERROR: Cannot access Twitter API\n' + JSON.stringify(err));
            }
        });
    });

    app.post('/api/twitter/tweets', (req, res) => {
        twitter.get('statuses/user_timeline', {"user_id": credentials.user_id, include_rts: true, exclude_replies: true}, (err, result) => {
            if (!err) {
                res.send(result);
            }
            else {
                console.error('ERROR: Cannot access Twitter API\n' + JSON.stringify(err));
            }
        });
    });
};
