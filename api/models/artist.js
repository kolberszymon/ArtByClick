const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    psuedo: String
});

module.exports = mongoose.model('Artist', artistSchema);