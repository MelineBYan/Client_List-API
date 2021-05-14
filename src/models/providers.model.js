const mongoose = require("mongoose");
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Provider", providerSchema);
