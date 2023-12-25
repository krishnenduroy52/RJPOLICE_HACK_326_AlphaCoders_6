const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: String,
    state: String,
    district: String,
    zip: String,
    country: String,
});

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phoneno: String,
    address: addressSchema,
    isAdmin: Boolean,
});

const cameraSchema = new mongoose.Schema({
    cameraModel: String,
    cameraQuality: String,
    cameraSerialNo: String,
    cameraMacAddress: String,
    cameraLatitude: String,
    cameraLongitude: String,
    cameraViewLeft: String,
    cameraViewRight: String,
});

const userDetailsSchema = new mongoose.Schema({
    user: userSchema,
    camera: cameraSchema,
});

const UserDetailsModel = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetailsModel;
