const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

//Handling Routes
const artWorkRoutes = require('./api/routes/artworks');
const artistRoutes = require('./api/routes/artists');

mongoose.connect(
"mongodb://szymonknight4:" + process.env.MONGO_ATLAS_PW + "@artbyclick-shard-00-00-bbh07.mongodb.net:27017,artbyclick-shard-00-01-bbh07.mongodb.net:27017,artbyclick-shard-00-02-bbh07.mongodb.net:27017/test?ssl=true&replicaSet=ArtByClick-shard-0&authSource=admin&retryWrites=true"
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/artworks',express.static('uploads'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
              "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

//Setting up middleware
app.use('/artworks', artWorkRoutes);
app.use('/artists', artistRoutes);

app.get('/', (req,res) => {
    res.render('pages/home.ejs');
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
})

module.exports = app;