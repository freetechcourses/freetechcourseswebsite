const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
/*const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});*/

const Course = require("../models/data");

router.get("/", (req, res, next) => {
  Course.find()
    .select("name _id description courseImage hyperlink date categories technologies")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        courses: docs.map((doc) => {
          return {
            name: doc.name,
            _id: doc._id,
            description: doc.description,
            hyperlink: doc.hyperlink,
            date: doc.date,
            categories: doc.categories,
            technologies: doc.technologies,
          };
        }),
      };
      //if(docs.length>=0){
      res.status(200).json(response);
      //} else {
      //res.status(404).json({
      //  message:"No entries found"
      // });
      //}
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  console.log(req.file);
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    hyperlink: req.body.hyperlink,
    categories: req.body.categories,
    technologies: req.body.technologies,
  });
  course
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Course created successfully",
        createdCourse: {
          name: result.name,
          _id: result._id,
          description: result.description,
          //courseImage: result.courseImage,
          hyperlink: result.hyperlink,
          categories: result.categories,
          technologies: result.technologies,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  Course.findById(id)
    .select("name _id description courseImage hyperlink date categories technologies")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          course: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided search" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Course.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Course updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  Course.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Course deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
