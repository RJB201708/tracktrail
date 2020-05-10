var restify = require('restify');
var plugins = require('restify-plugins');
var restifyValidator = require('restify-validator');

var mongoose = require('mongoose');

var setupController = require('./server/controllers/setupController.js');
var userController = require('./server/controllers/userController.js');
var coordinatesController = require('./server/controllers/coordinatesController.js');
var config = require('./server/config/dbConnection.js');

mongoose.connect(config.getMongoConnection());
console.log('Connection with mongo successful*************');
var server = restify.createServer();
setupController(server, restify, restifyValidator);
userController(server);
coordinatesController(server);
//test

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
