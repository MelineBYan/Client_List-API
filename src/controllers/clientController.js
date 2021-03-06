const Client = require("../models/clients.model");
const Provider = require("../models/providers.model");
const mongoose = require("mongoose");

class ClientController {
  //get clients
  static async getAll(req, res, next) {
    try {
      const { query } = req;
      const dbQuery = {};

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbQuery.$or = [{ name: searchReg }, { email: searchReg }];
      }
      if (query.create_lte || query.create_gte) {
        const createdAtQuery = {};
        query.create_lte && (createdAtQuery.$lte = new Date(query.create_lte));
        query.create_gte && (createdAtQuery.$gte = new Date(query.create_gte));
        dbQuery.created_at = createdAtQuery;
      }

      const sort = {};
      if (query.sort) {
        switch (query.sort) {
          case "a-z":
            sort.name = 1;
            break;
          case "z-a":
            sort.name = -1;
            break;
          case "creation_date_oldest":
            sort.created_at = 1;
            break;
          case "creation_date_newest":
            sort.created_at = -1;
            break;
        }
      }

      const clients = await Client.find(dbQuery)
        .sort(sort)
        .populate({ path: "providers" });

      if (!clients) {
        return res
          .status(404)
          .json({ error: [{ msg: "There are no clients" }] });
      }
      return res.status(200).json({ clients });
    } catch (err) {
      next(err);
    }
  }

  //create client
  static async create(req, res, next) {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res
          .status(400)
          .json({ error: [{ msg: "Missing required fields" }] });
      }

      req.body.providers.forEach(async (p) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(p._id)) {
            return res.status(404).json({ error: [{ msg: "Invalid id" }] });
          }
          const prov = await Provider.findById(p._id);

          if (!prov || prov.name !== p.name) {
            return res
              .status(404)
              .json({ error: [{ msg: "Provider not found" }] });
          }
        } catch (err) {
          next(err);
        }
      });

      const providers = req.body.providers.map((p) => p._id);

      let client = await Client.create({ ...req.body, providers });
      client = await Client.findById(client._id).populate({
        path: "providers",
      });

      return res.status(200).json(client);
    } catch (err) {
      next(err);
    }
  }

  //update client by Id
  static async update(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: [{ msg: "Invalid id" }] });
      }
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res
          .status(400)
          .json({ error: [{ msg: "Missing required fields" }] });
      }
      req.body.providers.forEach(async (p) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(p._id)) {
            return res.status(404).json({ error: [{ msg: "Invalid id" }] });
          }
          const prov = await Provider.findById(p._id);
          if (!prov) {
            return res
              .status(404)
              .json({ error: [{ msg: "Provider not found" }] });
          }
        } catch (err) {
          next(err);
        }
      });

      const providers = req.body.providers.map((p) => p._id);
      let client = await Client.findByIdAndUpdate(req.params.id, {
        ...req.body,
        providers,
      });

      if (!client) {
        return res
          .status(404)
          .json({ error: [{ msg: "Client is not found" }] });
      }

      const updated = await Client.findById(req.params.id).populate({
        path: "providers",
      });
      return res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  //remove client by Id
  static async remove(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: [{ msg: "Invalid id" }] });
      }
      const client = await Client.findByIdAndRemove(req.params.id);

      if (!client) {
        return res
          .status(404)
          .json({ error: [{ msg: "There is nothing to remove" }] });
      }

      return res.status(200).json({ success: "true" });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ClientController;
