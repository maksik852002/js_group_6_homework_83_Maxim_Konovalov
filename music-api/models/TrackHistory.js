const mongoose = require("mongoose");

const TrackHistoryShema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    trackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true
    },
    datetime: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const TrackHistory = mongoose.model("TrackHistory", TrackHistoryShema);

module.exports = TrackHistory;
