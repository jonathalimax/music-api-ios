var express  = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Music = require('./app/model/music');
var app = express();

// Config bodyParser to get data from a POST
app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music-app');

// Set router
var router = express.Router();

// Routes to /music
router.route('/music')
  // GET for /music
  .get(function(req, res) {
    Music.find(function(err, musics) {
      if (err) {
        res.send(err);
      }
      res.json(musics);
    });
  })

  // POST for /music
  .post(function(req, res) {
    var music = new Music();
    music.name = req.body.name;
    music.artist = req.body.artist;
    music.info = req.body.info;
    music.sourceSound = req.body.sourceSound;
    music.sourcePhotoAlbum = req.body.sourcePhotoAlbum;

    music.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "The music was saved!" });
    });
  })

  .delete()

  .put();

//  Set prefix route
app.use('/api', router);

// Start server
app.listen(port);
console.log('Server started on port' + port);
