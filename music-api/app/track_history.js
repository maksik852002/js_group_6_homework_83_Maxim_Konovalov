const express = require("express");
const TrackHistory = require("../models/TrackHistory");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const date = new Date();
    const history = new TrackHistory(req.body);
    history.datetime = date;
    await history.save();
    return res.send(history);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
