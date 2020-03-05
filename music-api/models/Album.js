const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true
    },
    year: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
