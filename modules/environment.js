'use strict';

// Universal analytics
const ua = require('universal-analytics');
const uuid = require('uuid').v4();
const visitor = ua('UA-25684096-2');

// The public IP address of our Digital Ocean server
const dOceanIP = '178.62.30.178';

// Get the external IP address of the server we're running on
const getIP = require('external-ip')();
module.exports.setUpEnvironment = (express, app, callback) => {
    getIP((err, ip) => {
        // If our IP address matches that of our Digital Ocean server, run the production environment
        // Otherwise, run the development environment
        if (ip === dOceanIP && !err) {
            // serve the files out of ./public as our main files and initalise universal analytics
            app.use(express.static(__dirname + '/public'), function(req, res, next) {
                visitor.pageview({dp: "/", dt: "andrew-havis.co.uk", dh: "http://andrew-havis.co.uk/", cid: uuid, uip: req.headers['x-client-ip'] || req.headers['x-forwarded-for'] || req.ip, ua: req.headers['user-agent']}).send();
                next();
            });
            return callback('production');
        }
        else {
            if (!!err) {
                console.error('Defaulting to development as there was an error getting the external IP address of the server', err);
            }
            app.use('/', express.static(__dirname + '/dev'));

            // Set up the Morgan request logger
            var morgan = require('morgan');
            app.use(morgan('combined'));

            return callback('development');
        }
    });
};