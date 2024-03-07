const { response } = require("express");
const { EmailRepository } = require("../database");
const { ObjectId } = require('mongodb');
// const {  } = require('../utils');
const utils = require('../utils')

// All Business logic will be here
class EmailService {

  constructor() {
    this.repository = new EmailRepository();
    this.resdata = {
      message: 'invalid Request',
      apistatus: false,
      statuscode: 400
    };
  }

  async EmailCreate(userInputs) {

    try {
      const { email } = userInputs;
      const pipeline = [
        {
          $match: {
            email: email,
          },
        }
      ];
      const existingEmail = await this.repository.GetPipelineData(pipeline);

      if ((existingEmail.length == 0)) {
        const response = await this.repository.EmailCreate(userInputs);
        var successmsg = await utils.ResponseMessage("datainsert");
        var errormsg = await utils.ResponseMessage("nodatainsert");
        var apires = await utils.FormateData(response, successmsg, errormsg);
        return apires;
      }
      else {
        this.resdata.message = await utils.ResponseMessage("dataexist");
        this.resdata.statuscode = 409;
        this.resdata.data = [];
      }
      return this.resdata;

    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async Login(userInputs) {

    try {
      const { email, password } = userInputs;
      const pipeline = [
        {
          $match: {
            email: email,
            password: password
          },
        }
      ];
      const existingEmail = await this.repository.GetPipelineData(pipeline);

      console.log(existingEmail);
      if ((existingEmail.length != 0)) {

        await this.repository.EmailUpdate(userInputs);

        var successmsg = await utils.ResponseMessage("varifysuccesfully");
        var errormsg = await utils.ResponseMessage("invalidemp");
        var apires = await utils.FormateData(existingEmail, successmsg, errormsg);
        return apires;
      }
      else {
        this.resdata.message = await utils.ResponseMessage("invalidemp");
        this.resdata.statuscode = 409;
        this.resdata.data = [];
      }
      return this.resdata;

    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async EmailUpdate(userInputs) {

    try {

      const UpdateEmail = await this.repository.EmailUpdate(userInputs);

      if (UpdateEmail) {
        var successmsg = await utils.ResponseMessage("dataupdate");
        var errormsg = await utils.ResponseMessage("nodataupdate");
        var apires = await utils.FormateData(UpdateEmail, successmsg, errormsg);
        return apires;
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async AddTour(userInputs) {

    try {

      let { email, tourid } = userInputs;

      const pipeline = [
        { $match: { email: email }, },
      ];

      const find = await this.repository.GetPipelineData(pipeline);

      if (find) {

        let arrayTour = find[0].tour
        var addTour = true
        for (let i = 0; i < arrayTour.length; i++) {
          if (arrayTour[0].tourid == tourid) {
            addTour = false
          }
        }
        if (addTour == true) {
          arrayTour.push({ tourid: tourid });
        }
        userInputs.tour = arrayTour;
        const UpdateEmail = await this.repository.EmailUpdate(userInputs);

        if (UpdateEmail) {
          var successmsg = await utils.ResponseMessage("dataupdate");
          var errormsg = await utils.ResponseMessage("nodataupdate");
          var apires = await utils.FormateData(UpdateEmail, successmsg, errormsg);
          return apires;
        }
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }
  
  async RemoveTour(userInputs) {

    try {

      let { email, tourid } = userInputs;

      const pipeline = [
        { $match: { email: email }, },
      ];

      const find = await this.repository.GetPipelineData(pipeline);

      if (find) {

        let arrayTour = find[0].tour
        var addTour = []
        for (let i = 0; i < arrayTour.length; i++) {
          if (arrayTour[i].tourid != tourid) {
            addTour.push(arrayTour[i])
          }
        }
        userInputs.tour = addTour;
        const UpdateEmail = await this.repository.EmailUpdate(userInputs);

        if (UpdateEmail) {
          var successmsg = await utils.ResponseMessage("dataupdate");
          var errormsg = await utils.ResponseMessage("nodataupdate");
          var apires = await utils.FormateData(UpdateEmail, successmsg, errormsg);
          return apires;
        }
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async GetAllData(userInputs) {

    try {
      let { email } = userInputs;

      const pipeline = [
        { $match: { email: email }, },
      ];

      const find = await this.repository.GetPipelineData(pipeline);

      if (find) {
        var successmsg = await utils.ResponseMessage("datafound");
        var errormsg = await utils.ResponseMessage("nodatafound");
        var apires = await utils.FormateData(find, successmsg, errormsg);
        return apires;
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }
  }

}

module.exports = EmailService;