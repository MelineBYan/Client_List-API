const { body, validationResult } = require("express-validator");
const errorConfig = require("../../config/error.config");
const Client = require("../models/clients.model");

const clientValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty !")
    .isLength({ min: 1 })
    .withMessage("Must be at least 1 chars long")
    .isLength({ max: 50 })
    .withMessage("Must be less than 50 character")
    .trim(),
  body("phone")
    .notEmpty()
    .withMessage("Phone number cannot be empty!")
    .matches(/\d/)
    .withMessage("Must contain a number")
    .isMobilePhone()
    .withMessage("Invalid mobile phone")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty!")
    .isEmail()
    .withMessage("Must be Email !")
    .trim()
    .normalizeEmail(),
];
const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      error: result.array(),
      message: "Validation error",
    });
  }
  next();
};

module.exports = { clientValidator, validatorMiddleware };
