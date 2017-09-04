var helpers = require('../config/helperFunctions.js');
var CoordinatesModel = require('../models/coordinates.model.js');

// Fake database
var coordinates = {};
//var max_coordinates_id = 0;

module.exports = function(server) {

    server.get("/coordinates", function(req, res, next) {
        CoordinatesModel.find({}, function(err, coordinates) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the data from the database', 500);
                return next();
            }

            if (coordinates === null) {
                helpers.failure(res, next, 'There is no data in the repository', 404);
                return next();
            }
            console.log("entering in /coordinates");
            helpers.success(res, next, coordinates);
            return next();
        });
    });

    server.get("/coordinates/:id", function(req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, 'error', 400);
            return next();
        }
        CoordinatesModel.findOne({ _id: req.params.id }, function(err, coordinates) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the coordinates for user from the database', 500);
                return next();
            }
            if (user === null) {
                helpers.failure(res, next, 'The specified user could not be found or does not have coordinates data', 404);
                return next();
            }
            helpers.success(res, next, coordinates);
            return next();
        });
    });

    server.post("/coordinates", function(req, res, next) {
        req.assert('userid', 'User Id is required').notEmpty();
        req.assert('longitude', 'longitude is required').notEmpty();
        req.assert('latitude', 'latitude is required').notEmpty();
        req.assert('timestamp', 'timestamp is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors, 400);
            return next();
        }

        var coordinates = new CoordinatesModel();
        coordinates.userid = req.params.userid;
        coordinates.longitude = req.params.longitude;
        coordinates.latitude = req.params.latitude;
        coordinates.timestamp = req.params.timestamp;
        coordinates.save(function(err) {
            if (err) {
                helpers.failure(res, next, 'errors saving to db', 500);
                return next();
            }
            helpers.success(res, next, user);
            return next();
        });
    });

    server.put("/coordinates/:id", function(req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
            return next();
        }
        CoordinatesModel.findOne({ _id: req.params.id }, function(err, coordinates) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the coordinates for user from the database', 500);
                return next();
            }
            if (coordinates === null) {
                helpers.failure(res, next, 'The specified user does not have coordinates data', 404);
                return next();
            }
            var updates = req.params;
            delete updates.id;
            for (var field in updates) {
                coordinates[field] = updates[field];
            }
            user.save(function(err) {
                if (err) {
                    helpers.failure(res, next, 'errors', 500);
                    return next();
                }
                helpers.success(res, next, coordinates);
                return next();
            });
        });
    });

    server.del("/coordinates/:id", function(req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
            return next();
        }
        CoordinatesModel.findOne({ _id: req.params.id }, function(err, coordinates) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the coordinates for user from the database', 500);
                return next();
            }
            if (coordinates === null) {
                helpers.failure(res, next, 'The specified user coordinates not be found', 404);
                return next();
            }
            coordinates.remove(function(err) {
                if (err) {
                    helpers.failure(res, next, 'errors', 500);
                    return next();
                }
                helpers.success(res, next, coordinates);
                return next();
            });
        });
    });

}