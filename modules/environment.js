'use strict';

// The public IP address of our Digital Ocean server
const dOceanIP = '178.62.30.178';

// Get the external IP address of the server we're running on
const getIP = require('external-ip')();
module.exports.setUpEnvironment = (express, app, callback) => {
    getIP((err, ip) => {
        console.log('The IP address is', ip);
	// If our IP address matches that of our Digital Ocean server, run the production environment
        // Otherwise, run the development environment
        if (ip === dOceanIP && !err) {
            console.log('On the Digital Ocean production environment');
            return callback('production');
        }
        else {
            if (!!err) {
                console.error('Defaulting to development as there was an error getting the external IP address of the server', err);
            }

            // Set up the Morgan request logger
            var morgan = require('morgan');
            app.use(morgan('combined'));

            return callback('development');
        }
    });
};
