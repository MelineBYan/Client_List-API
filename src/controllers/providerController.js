const errorConfig = require("../../config/error.config");
const Provider = require("../models/providers.model");

class ProviderController {
  //get providers
  static async getAll(req, res, next) {
    try {
      const info = await Provider.find();
      return res.json({ providers: info });
    } catch (err) {
      next(err);
    }
  }

  //create provider
  static async create(req, res, next) {
    try {
      if (!req.body.name) {
        throw errorConfig.nothingToUpdate;
      }
      const provider = await Provider.create(req.body);

      return res.json(provider);
    } catch (err) {
      next(err);
    }
  }

  //update provider by Id

  static async update(req, res, next) {
    try {
      if (!req.body) {
        throw errorConfig.nothingToUpdate;
      }
      if (!req.body.name) {
        throw errorConfig.badRequest;
      }

      const provider = await Provider.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!provider) {
        throw errorConfig.providerNotFound;
      }
      const updated = await await Provider.findById(req.params.id);
      return res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  //remove provider by Id

  static async remove(req, res, next) {
    try {
      const provider = await Provider.findByIdAndRemove(req.params.id);
      if (!provider) {
        throw errorConfig.providerNotFound;
      }
      return res.json(provider);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProviderController;
