const mongoose = require("mongoose");
const { TourModel } = require("../models");

const { error } = require("console");
// const utils = require("../../utils");

//Dealing with data base operations
class tourRepository {

  async tourCreate(req) {
    try {
      const tour = new TourModel(req);
      const tourRes = await tour.save();
      return [tourRes];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async GetPipelineData(pipeline) {
    try {

      const data = await TourModel.aggregate(pipeline);

      return data || []
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async tourUpdate(userInputs) {
    try {

      const { id } = userInputs
      const updatedtour = await TourModel.findByIdAndUpdate(id, userInputs, { new: true, });

      return [updatedtour];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

}

module.exports = tourRepository;
