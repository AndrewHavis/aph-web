
# aph-web
Version 2.0 of andrew-havis.co.uk
=======

This repository contains the code behind my personal website at http://www.andrew-havis.co.uk/. If you would like to run this locally, please feel free to clone or fork this repository, and then do the following.

1. Install the dependencies using the following command:
    npm install && bower install

2. Ensure that the `grunt-cli` package is installed:
   npm install -g grunt-cli

3. Add in the required API keys as described below.

4. Build the website using `grunt build`.

5. The website can now be run locally using `node app`.


API Keys
========

Note that the [Twitter](https://apps.twitter.com/), [Flickr](https://www.flickr.com/services/api/misc.api_keys.html) and [Google Analytics](https://analytics.google.com/) add-ons will require API keys for the respective services. Once these have been obtained, the keys will need to be added to a `credentials.json` file within the root directory in this format, replacing the placeholder values within the square brackets:

    {
        "flickr": {
            "user_id": "[Flickr User ID]",
            "photoset_id": "[Flickr Photoset ID]",
            "api_key": "[Flickr API Key]",
            "secret": "[Flickr API Secret]"
        },
        "twitter": {
            "user_id": "[Twitter User ID]",
            "consumer_key": "[Twitter Consumer Key]",
            "consumer_secret": "[Twitter Consumer Secret]",
            "access_token": "[Twitter Access Token]",
            "access_secret": "[Twitter Access Secret]"
        },
        "google_analytics": {
            "account_id": "[Google Analytics Account ID]"
        }
    }

Contact
=======

If there are any problems, please feel free to contact me via the channels listed [on my website](https://www.andrew-havis.co.uk/).
