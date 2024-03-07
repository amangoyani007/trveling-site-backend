const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourModel = new Schema(
  {
    city: { type: String },
    country: { type: String },
    img: { type: String },
    title: { type: String },
    description: { type: String },
    update: { type: String },
    likecount: { type: Number },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tour", TourModel);
