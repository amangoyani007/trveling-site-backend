const { validationResult } = require("express-validator");
const { CreateEmailValidator, Login, GetAllDataValidator } = require("../route/email-validator");
const EmailService = require("../service/email-service");
const utils = require('../utils')

module.exports = (app) => {
  const service = new EmailService();
  let apiresponse = { statuscode: 400, message: "Bad Request", data: [], apistatus: false };

  app.post("/email/create", CreateEmailValidator, async (req, res, next) => {
    const errors = validationResult(req);
    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.EmailCreate(req.body);
        console.log(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.post("/email", GetAllDataValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.GetAllData(req.body);
        console.log(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.post("/email/addtour", GetAllDataValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.AddTour(req.body);
        console.log(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.post("/email/removetour", GetAllDataValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.RemoveTour(req.body);
        console.log(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.post("/email/login", Login, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        const apiresponse = await service.Login(req.body);
        return res.json(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.put("/email/update", async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.EmailUpdate(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

  app.get("/officeventure/citymaster/search", async (req, res, next) => {
    try {
      const cityname = req.body.cityname;
      const apires = await service.GetSearchData(cityname);

      apiresponse.data = apires.data
      apiresponse.message = apires.message;
      apiresponse.apistatus = apires.apistatus;
      statuscode = apires.statuscode;

      var response = await utils.GetApiResponse(apiresponse);
      return res.status(statuscode).json(response);

    } catch (err) {
      console.log(err);
      next(err);
    }
  });

};
