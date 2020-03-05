const path = require("path");
const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const config = require("../config");
const Album = require("../models/Album");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", async (req, res) => {
  let albums;
  if (req.query.artist) {
    albums = await Album.find({ artist: req.query.artist });
  } else {
    albums = await Album.find();
  }
  res.send(albums);
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    res.send(album);
  } catch (e) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const albums = new Album(req.body);
  if (req.file) {
    albums.image = req.file.filename;
  }
  try {
    await albums.save();
    res.send({ id: albums._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

module.exports = router;
