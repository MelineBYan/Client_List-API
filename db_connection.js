const mongoose = require("mongoose");
const { mongo } = require("./config/");

module.exports = mongoose.connect(
  mongo.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log(`Error: ${err.message}`);
    }
    console.log("Connected!");
  }
);
