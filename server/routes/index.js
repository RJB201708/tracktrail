var express = require('express');
var router = express.Router();
var ctrlCoordinates = require('../controllers/coordinates.controller.js');
console.log("Entering routes");
router
    .route('/coordinates')
    .get(ctrlCoordinates.coordinatesGetAll)
    .post(ctrlCoordinates.coordinatesAddOne);


router
    .route('/coordinates/:userId')
    .get(ctrlCoordinates.coordinatesGetOne)
    .put(ctrlCoordinates.coordinatesUpdateOne)
    .delete(ctrlCoordinates.coordinatesDeleteOne);


module.exports = router;