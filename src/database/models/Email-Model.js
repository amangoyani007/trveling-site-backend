const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailModel = new Schema(
  {
    email: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String },
    country: { type: String },
    address: { type: String },
    active: { type: Boolean },
    login: { type: Boolean },
    tour: [],

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("email", EmailModel);
