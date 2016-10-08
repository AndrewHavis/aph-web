'use strict';

// Import Flickr API
module.exports.setUpFlickrRoutes = (keys, app) => {
    var Flickr = require('node-flickr');
    var flickr = new Flickr(keys);
    
    // Retrieve username to see if Flickr API is working
    flickr.get('people.getInfo', {"user_id": keys.user_id}, function(err, result) {
        if (!err) {
            console.log('Using photostream of Flickr user \'' + result.person.username._content + '\'');
        }
        else {
            console.error('ERROR: Cannot access Flickr API\n' + JSON.stringify(err));
        }
    });
    
    // Flickr API
    app.post('/api/flickr/photos', function(req, res) {
        flickr.get('people.getPublicPhotos', {"user_id": keys.user_id, "extras": "url_t, url_m, url_l, url_o"}, function(err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                console.error('ERROR: Cannot access Flickr API\n' + JSON.stringify(err));
            }
        });
    });

    app.post('/api/flickr/set/:setId', function(req, res) {
        flickr.get('photosets.getPhotos', {"photoset_id": req.params.setId, "user_id": keys.user_id, "extras": "url_l", "media": "photos"}, function(err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                console.error('ERROR: Cannot access Flickr API\n' + JSON.stringify(err));
            }
        });
    });
};