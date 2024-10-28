const mongoose = require('mongoose');

const lyricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: false,
  },
  lyrics: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  link : {
    type: String,
    required: false,
  }
});
//   user: {
//     type: mongoose.Schema.Types.ObjectId,

const Lyrics = mongoose.model('Lyrics', lyricSchema);

module.exports = Lyrics 
