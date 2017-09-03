var restify = require('restify');
var plugins = require('restify-plugins');
var restifyValidator = require('restify-validator');

var mongoose = require('mongoose');

var setupController = require('./server/controllers/setupController.js');
var userController = require('./server/controllers/userController.js');
var config = require('./server/config/dbConnection.js');

mongoose.connect(config.getMongoConnection());

var server = restify.createServer();
setupController(server, restify, restifyValidator);
userController(server);

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});