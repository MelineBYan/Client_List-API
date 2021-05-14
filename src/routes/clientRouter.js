const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/clientController.js");
const {
  clientValidator,
  validatorMiddleware,
} = require("../validators/clientValidator");

router.get("/", ClientController.getAll);
router.post("/", clientValidator, validatorMiddleware, ClientController.create);
router.put(
  "/:id",
  clientValidator,
  validatorMiddleware,
  ClientController.update
);
router.delete("/:id", ClientController.remove);

module.exports = router;
