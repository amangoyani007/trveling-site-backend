const mongoose = require("mongoose");
const { EmailModel } = require("../models");

const { error } = require("console");
// const utils = require("../../utils");

//Dealing with data base operations
class EmailRepository {

  async EmailCreate(req) {
    try {
      const email = new EmailModel(req);
      const emailRes = await email.save();
      return [emailRes];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async GetPipelineData(pipeline) {
    try {

      const data = await EmailModel.aggregate(pipeline);

      return data || []
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async EmailUpdate(userInputs) {
    try {

      const { email } = userInputs
      const updatedEmail = await EmailModel.findOneAndUpdate({ email: email }, userInputs, { new: true, });

      return [updatedEmail];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async UpdateCityMaster(userInputs) {
    const { id } = userInputs;
    const output = await utils.FilterNullValuesJson(userInputs);

    try {
      mongoose.set("useFindAndModify", false);

      const updatedmaster = await CityMaster.findByIdAndUpdate(id, output, { new: true, });
      return updatedmaster;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
}

module.exports = EmailRepository;
