var express = require("express");
const Books = require("../models/Books");
const Genre = require("../models/Genre");
const Notifications = require("../models/Notifications");
var router = express.Router();

router.get("/", function (req, res, next) {
  Books.find({}, (err, result) => {
    res.send({ data: result, msg: "Books Fetched Successfully!" });
  });
});

router.post("/add", function (req, res, next) {
  const { bookName, bookAuthor, bookDescription, bookGenre } = req.body;
  const book = new Books({ bookName, bookAuthor, bookDescription, bookGenre });
  const newNotification = Notifications({
    notificationTitle: "New book added",
    notificationMessage: `${bookName} by ${bookAuthor} is added!`,
    date: new Date(),
  });
  Genre.findOne({ genreName: bookGenre }, (err, result) => {
    newNotification.save();
    if (result) {
      result.count += 1;
      result.save();
    } else {
      const genre = new Genre({
        genreName: bookGenre,
        count: 1,
      });
      genre.save();
    }
  });
  book.save((err) => {
    if (err) return err;
    res.send({ msg: "Book added successfully", book });
  });
});

router.put("/update", function (req, res, next) {
  const { bookId, bookName, bookAuthor, bookDescription, bookGenre } = req.body;
  const newNotification = Notifications({
    notificationTitle: "Book Updated",
    notificationMessage: `${bookName} has been updated`,
    date: new Date(),
    bookId: bookId,
  });
  Books.findByIdAndUpdate(
    bookId,
    { bookName, bookAuthor, bookDescription, bookGenre },
    (err, result) => {
      if (err) return err;
      newNotification.save();
      res.send({ msg: "Book updated successfully", book: result });
    }
  );
});

router.post("/search", function (req, res, next) {
  const { bookName } = req.body;
  Books.find(
    {
      $or: [
        { bookName: { $regex: bookName, $options: "i" } },
        { bookDescription: { $regex: bookName, $options: "i" } },
      ],
    },
    (err, result) => {
      if (err) return err;
      res.send({ data: result, msg: "Books Fetched Successfully!" });
    }
  );
});
//update multiple books
router.put("/update/multiple", function (req, res, next) {
  const { bookIds, bookName, bookAuthor, bookDescription, bookGenre } =
    req.body;
  Books.updateMany(
    { _id: { $in: bookIds } },
    { bookName, bookAuthor, bookDescription, bookGenre },
    (err, result) => {
      if (err) return err;
      res.send({ msg: "Books updated successfully", book: result });
    }
  );
});
module.exports = router;
