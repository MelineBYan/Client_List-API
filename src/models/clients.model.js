const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },

  providers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Provider",
    },
  ],
});

module.exports = mongoose.model("Client", clientSchema);
