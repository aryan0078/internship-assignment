var express = require("express");
const Notifications = require("../models/Notifications");
var router = express.Router();

router.get("/", function (req, res, next) {
  //sort Notification  by date
  Notifications.find().sort({ date: -1 }).exec(function (err, result) { 
    res.send({ data: result, msg: "Notification Fetched Successfully!" });
  });
});

router.post("/add", function (req, res, next) {
  const { notificationTitle, notificationDescription, notificationDate } =
    req.body;
  const notification = new Notifications({
    notificationTitle,
    notificationDescription,
    notificationDate,
  });
  notification.save((err) => {
    if (err) return err;
    res.send({ msg: "Notification added successfully", notification });
  });
});
module.exports = router;


