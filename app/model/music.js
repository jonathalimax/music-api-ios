var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  name: String,
  artist: String,
  info: String,
  sourceSound: String,
  sourcePhotoAlbum: String
});

module.exports = mongoose.model('Music', MusicSchema);
