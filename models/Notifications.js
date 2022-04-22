let mongoose = require("mongoose");

let notificationSchema = new mongoose.Schema({
    date: String,
    bookId: String,
    notificationTitle: String,
    notificationMessage:String
});

module.exports = mongoose.model("Notifications",notificationSchema);
