const { response } = require("express");
const { TourRepository, EmailRepository } = require("../database");
const { ObjectId } = require('mongodb');
// const {  } = require('../utils');
const utils = require('../utils');
const { pipeline } = require("stream");
const email = require("../api/email");

// All Business logic will be here
class tourService {

  constructor() {
    this.repository = new TourRepository();
    this.repositoryEmail = new EmailRepository();
    this.resdata = {
      message: 'invalid Request',
      apistatus: false,
      statuscode: 400
    };
  }

  async tourCreate(userInputs) {

    try {
      const { city } = userInputs;
      const pipeline = [
        {
          $match: {
            city: city.trim(),
          },
        }
      ];
      const existingtour = await this.repository.GetPipelineData(pipeline);

      if ((existingtour.length == 0)) {
        const response = await this.repository.tourCreate(userInputs);
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
      const { tour, password } = userInputs;
      const pipeline = [
        {
          $match: {
            tour: tour,
            password: password
          },
        }
      ];
      const existingtour = await this.repository.GetPipelineData(pipeline);

      console.log(existingtour);
      if ((existingtour.length != 0)) {

        await this.repository.tourUpdate(userInputs);

        var successmsg = await utils.ResponseMessage("varifysuccesfully");
        var errormsg = await utils.ResponseMessage("invalidemp");
        var apires = await utils.FormateData(existingtour, successmsg, errormsg);
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

  async tourUpdate(userInputs) {

    try {

      const Updatetour = await this.repository.tourUpdate(userInputs);

      if (Updatetour) {
        var successmsg = await utils.ResponseMessage("dataupdate");
        var errormsg = await utils.ResponseMessage("nodataupdate");
        var apires = await utils.FormateData(Updatetour, successmsg, errormsg);
        return apires;
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async tourAddLike(userInputs) {

    try {

      const { id } = userInputs;
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        }
      ];
      const GetTour = await this.repository.GetPipelineData(pipeline);

      if (GetTour) {
        var like = GetTour[0].likecount || 0
        like = like + 1;
        userInputs.likecount = like;
        const AddLike = await this.repository.tourUpdate(userInputs);

        if (AddLike) {
          var successmsg = await utils.ResponseMessage("dataupdate");
          var errormsg = await utils.ResponseMessage("nodataupdate");
          var apires = await utils.FormateData(AddLike, successmsg, errormsg);
          return apires;
        }
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async tourRemoveLike(userInputs) {

    try {

      const { id } = userInputs;
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        }
      ];
      const GetTour = await this.repository.GetPipelineData(pipeline);

      if (GetTour) {
        var like = GetTour[0].likecount || 1
        like = like - 1;
        userInputs.likecount = like;
        const AddLike = await this.repository.tourUpdate(userInputs);

        if (AddLike) {
          var successmsg = await utils.ResponseMessage("dataupdate");
          var errormsg = await utils.ResponseMessage("nodataupdate");
          var apires = await utils.FormateData(AddLike, successmsg, errormsg);
          return apires;
        }
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async GetAllData() {

    try {

      const pipeline = [
        { $project: { __v: 0, createdAt: 0, updatedAt: 0 }, },
        { $sort: { _id: 1 } }
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

  async GetLikeData(userInputs) {

    try {

      const { email } = userInputs;
      const pipeline = [
        { $match: { email: email }, },
      ];
      const find = await this.repositoryEmail.GetPipelineData(pipeline);

      if (find.length!=0) {
        var tourArray = []
        for (let i = 0; i < find[0].tour.length; i++) {
          const findTour = await this.GetTourDetails({ id: find[0].tour[i].tourid });
          tourArray.push(findTour.data[0])
        }
        if (tourArray) {
          var successmsg = await utils.ResponseMessage("datafound");
          var errormsg = await utils.ResponseMessage("nodatafound");
          var apires = await utils.FormateData(tourArray, successmsg, errormsg);
          return apires;
        }
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }
  }

  async GetTourDetails(userInputs) {

    try {

      const { id } = userInputs;
      console.log(id);
      const pipeline = [
        { $match: { _id: new ObjectId(id) } }
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

  async GetSearchData(userInputs) {

    try {

      const { city } = userInputs;
      const pipeline = [
        {
          $match:
          {
            $or:
              [
                { city: new RegExp(city.trim(), "i") },
                { country: new RegExp(city.trim(), "i") }
              ]
          }
        },
        { $project: { __v: 0 } }
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

module.exports = tourService;