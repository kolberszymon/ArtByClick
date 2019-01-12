const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    artist: String,
    artworkImage: {
        //Type is string because its url to image
        type: String,
    },
    description: String
});

module.exports = mongoose.model('ArtWork', artworkSchema);