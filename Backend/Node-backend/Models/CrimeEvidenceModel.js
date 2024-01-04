const mongoose = require('mongoose');

const crimeEvidenceSchema = new mongoose.Schema({
    image: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    time: { type: Date, required: true },
    userid: { type: String, required: true },
    crime: { type: String, required: true },
});

const CrimeEvidenceModel = mongoose.model('Crime', crimeEvidenceSchema);

module.exports = CrimeEvidenceModel;