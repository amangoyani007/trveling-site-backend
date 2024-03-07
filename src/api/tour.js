const { validationResult } = require("express-validator");
const { CreatetourValidator, UpdateTourValidator } = require("../route/tour-validation");
const tourService = require("../service/tour-service");
const utils = require('../utils')

module.exports = (app) => {
  const service = new tourService();
  let apiresponse = { statuscode: 400, message: "Bad Request", data: [], apistatus: false };

  app.post("/tour/create", CreatetourValidator, async (req, res, next) => {
    const errors = validationResult(req);
    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.tourCreate(req.body);
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

  app.post("/tour", async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.GetAllData();
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

  app.post("/tour/likelist", async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.GetLikeData(req.body);
        console.log(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(200).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.post("/tour/get", async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.GetTourDetails(req.body);
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

  app.put("/tour/update", UpdateTourValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.tourUpdate(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

  app.put("/tour/addlike", UpdateTourValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.tourAddLike(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

  app.put("/tour/removelike", UpdateTourValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.tourRemoveLike(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

  app.post("/tour/search", async (req, res, next) => {
    try {
      const apires = await service.GetSearchData(req.body);

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

  // For Extra Example
  app.get("/leetcode", async (req, res, next) => {
    try {

      var s = req.body.s;
      var p = req.body.p;

      var response = maxCoins(s, p)
      function maxCoins(s, p) {

        if (p == ".*") { return true }

        if (p.includes("*")) {
          for (let i = 0; i < p.length; i++) {
            console.log(s, p[i])

            var l = 0;
            if (p[i] == '*') {
              if (p[i - 1] == '*') { l = i }
              l = i;
              console.log("hi")
              if (i > 0) {
                p = p.substring(0, i) + p[i - 1] + p.substring(i + 1);
              }
              else {
                p = p.substring(0, i) + p[i + 1] + p.substring(i + 1);

              }
            }
            else if (p[i] == '.') {
              p = p.substring(0, i) + s[i] + p.substring(i + 1);
            }
          }
          console.log(p, "after")

        }

        if (s === p) { return true }
        else { return false }

      };
      return res.json(response);

    } catch (err) {
      console.log(err);
      next(err);
    }
  });

};