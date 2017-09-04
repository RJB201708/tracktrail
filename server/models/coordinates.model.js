var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var coordinatesSchema = new Schema({
    id: ObjectId,
    userid: {
        type: String,
        required: true
    },
    longitude: Number,
    latitude: Number,
    timestamp: String

});
var CoordinatesModel = mongoose.model('coordinates', coordinatesSchema);
module.exports = CoordinatesModel;