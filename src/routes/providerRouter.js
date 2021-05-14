const express = require("express");
const router = express.Router();
const ProviderController = require("../controllers/providerController.js");
const {
  providerValidator,
  validatorMiddleware,
} = require("../validators/providerValidator");

router.get("/", ProviderController.getAll);
router.post(
  "/",
  providerValidator,
  validatorMiddleware,
  ProviderController.create
);
router.put(
  "/:id",
  providerValidator,
  validatorMiddleware,
  ProviderController.update
);
router.delete("/:id", ProviderController.remove);

module.exports = router;
