const express = require("express");
const Track = require("../models/Track");

const router = express.Router();

router.get("/", async (req, res) => {
  let tracks;
  if (req.query.album) {
    tracks = await Track.find({ album: req.query.album });
  } else if (req.query.artist) {
    tracks = await Track.find().populate("album");
    tracks = tracks.filter(
      el => el.album.artist._id.toString() === req.query.artist
    );
    tracks.forEach(el => (el.album = el.album._id));
  } else {
    tracks = await Track.find();
  }
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  try {
    const track = await Track.findById(req.params.id).populate("album");
    res.send(track);
  } catch (e) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.post("/", async (req, res) => {
  const track = new Track(req.body);
  try {
    await track.save();
    res.send({ id: track._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

module.exports = router;
