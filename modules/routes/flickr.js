'use strict';

// Import Flickr API
module.exports.setUpFlickrRoutes = (keys, app) => {
    const Flickr = require('node-flickr');
    const flickr = new Flickr(keys);
    
    // Retrieve username to see if Flickr API is working
    flickr.get('people.getInfo', {"user_id": keys.user_id}, (err, result) => {
        if (!err) {
            console.log('Using photostream of Flickr user \'' + result.person.username._content + '\'');
        }
        else {
            console.error('ERROR: Cannot access Flickr API\n' + JSON.stringify(err));
        }
    });
    
    // Flickr API
    app.post('/api/flickr/photos', (req, res) => {
        flickr.get('people.getPublicPhotos', {"user_id": keys.user_id, "extras": "url_t, url_m, url_l, url_o"}, (err, result) => {
            if (!err) {
                res.send(result);
            }
            else {
                console.error('ERROR: Cannot access Flickr API\n' + JSON.stringify(err));
            }
        });
    });

    app.post('/api/flickr/set/:setId', (req, res) => {
        flickr.get('photosets.getPhotos', {"photoset_id": req.params.setId, "user_id": keys.user_id, "extras": "url_l", "media": "photos"}, (err, result) => {
            if (!err) {
                res.send(result);
            }
            else {
                console.error('ERROR: Cannot access Flickr API\n' + JSON.stringify(err));
            }
        });
    });
};