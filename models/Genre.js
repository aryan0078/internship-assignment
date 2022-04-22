let mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
  genreName: String,
  count: {type:Number,default:0},
});

module.exports = mongoose.model("Genre",genreSchema);
