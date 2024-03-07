var { body } = require("express-validator");

const CreatetourValidator = [

  body("city")
    .notEmpty()
    .withMessage("City is requires"),

  body("title")
    .notEmpty()
    .withMessage("Title is requires"),

  body("description")
    .notEmpty()
    .withMessage("Description is requires"),

  body("country")
    .notEmpty()
    .withMessage("Country Name is requires")

];

const UpdateTourValidator = [

  body("id")
    .notEmpty()
    .withMessage("ID requires")
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Invalid ID'),

];

module.exports = {
  CreatetourValidator,
  UpdateTourValidator,
};
