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
        return res
          .status(404)
          .json({ error: [{ msg: "There is nothing to remove" }] });
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
        return res
          .status(404)
          .json({ error: [{ msg: "There is nothing to remove" }] });
      }
      if (!req.body.name) {
        return res
          .status(404)
          .json({ error: [{ msg: "There is nothing to remove" }] });
      }

      const provider = await Provider.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!provider) {
        return res
          .status(404)
          .json({ error: [{ msg: "There is nothing to remove" }] });
      }
      const updated = await Provider.findById(req.params.id);
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
        return res
          .status(404)
          .json({ error: [{ msg: "There is nothing to remove" }] });
      }
      return res.json(provider);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProviderController;
