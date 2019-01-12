const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Artist = require('../models/artist.js');

router.get('/', (req, res, next) => {
    Artist.find().then((artists) => {
        console.log(artists);
        res.status(200).render("pages/artists.ejs", {
          artists: artists,
        });
    }).catch(err => console.log(err));
});

router.post('/', (req, res, next) => {
    console.log(req.body);

    //Creating Artist Object
    const artist = new Artist({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        pseudo: req.body.pseudo,
    });

    //Saving it

    artist.save().then(result => {
        console.log(result);
        res.status(200).render("pages/artists.ejs");
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;
