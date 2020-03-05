const express = require("express");
const TrackHistory = require("../models/TrackHistory");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const AuthHeader = req.get("Authorization");
  if (!AuthHeader) {
    return res.status(401).send({ error: "User must be logged in" });
  };
  const [type, token] = AuthHeader.split(' ');
  if (type !== 'Token' || !token) {
    return res.status(401).send({ error: "User must be logged in" });
  };
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: "User must be logged in" });
  };

  try {
    const date = new Date();
    const history = new TrackHistory(req.body);
    history.userId = user._id;
    history.datetime = date;
    await history.save();
    res.send(history);
  } catch (e) {
    res.status(400).send(e);
  }
  
});

module.exports = router;
