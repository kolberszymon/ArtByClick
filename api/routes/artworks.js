const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});


const upload = multer({storage: storage});

const ArtWork = require('../models/artwork.js');

router.get('/', (req, res, next) => {
    ArtWork.find().then((artworks) => {
        console.log(artworks);
        res.status(200).render('pages/artworks.ejs', {
            artworks: artworks,
        });
    })
    .catch(err => console.log(err));


});

router.post('/', upload.single('artworkImage'),(req, res, next) => {
    console.log(req);
    //Creating artwork object
    const artwork = new ArtWork({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        artist: req.body.artist,
        artworkImage: req.file.path,
        description: req.body.description
    });
    //Saving it
    artwork.save().then(result => {
        console.log(result);
        res.status(200).render("pages/home.ejs");
    })
    .catch(err => console.log(err));
});

router.get('/:artworkId', (req, res, next) => {
    const id = req.params.artworkId;

    ArtWork.findById(id).then((artwork) => {
       res.render("pages/artwork_site.ejs",{
           artwork: artwork
       });
    });
});

router.get('/artwork/create', (req, res, next) => {

})

router.patch('/:artworkId', (req, res, next) => {
    const id = req.params.artworkId;
    res.status(200).json({
        msg: 'Update artwork',
    })
});


module.exports = router;
