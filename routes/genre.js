var express = require("express");
const Genre = require("../models/Genre");
const Notifications = require("../models/Notifications");
var router = express.Router();

router.post("/add", function (req, res, next) {
  const { genreName } = req.body;
  if(!genreName) res.send({ msg: "Please enter a genre name" });
  const genre = new Genre({ genreName });
  const newNotification = Notifications({
    notificationTitle: "New genre added",
    notificationMessage: `${genreName} is added!`,
    date: new Date(),
  })
  genre.save((err) => {
    if (err) return err;
    newNotification.save();
    res.send({ msg: "Genre added successfully", genre });
  });
});

router.get("/", function (req, res, next) {
  Genre.find({}, (err, result) => {
    res.send({ data: result, msg: "Genre Fetched Successfully!" });
  });
});

router.get("/" + ":genreId", function (req, res, next) { 
    const { genreId } = req.params;
    Genre.findById(genreId, (err, result) => {
        res.send({ data: result, msg: "Genre Fetched Successfully!" });
    });
});

router.get("/name/" + ":genreName", function (req, res, next) { 
    const { genreName } = req.params;
    Genre.findOne({ genreName }, (err, result) => {
        res.send({ data: result, msg: "Genre Fetched Successfully!" });
    });
})

module.exports = router;
