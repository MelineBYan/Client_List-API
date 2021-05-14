const { check, validationResult } = require("express-validator");
const providerValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is Required !")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .isLength({ max: 50 })
    .trim(),
];
const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  next();
};

module.exports = { providerValidator, validatorMiddleware };
