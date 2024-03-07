var { body } = require("express-validator");

const CreateEmailValidator = [

  body("email")
    .isEmail()
    .withMessage("invalid Email"),

  body("password")
    .notEmpty()
    .withMessage("Password is requires"),

  body("firstname")
    .notEmpty()
    .withMessage("First Name is requires"),

  body("lastname")
    .notEmpty()
    .withMessage("Last Name is requires"),

  body("address")
    .notEmpty()
    .withMessage("Address is requires"),

  // body("country")
  //   .notEmpty()
  //   .withMessage("Country Name is requires")
  //   .matches(/^[a-zA-Z\s]*$/)
  //   .withMessage("invalid Country Name"),

];

const Login = [

  body("email")
    .isEmail()
    .withMessage("invalid Email"),

  body("password")
    .notEmpty()
    .withMessage("Password is requires"),

];

const GetAllDataValidator = [

  body("email")
    .isEmail()
    .withMessage("invalid Email"),

];

module.exports = {
  CreateEmailValidator,
  Login,
  GetAllDataValidator,
};
