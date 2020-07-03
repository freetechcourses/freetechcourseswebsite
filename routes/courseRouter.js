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
    .select("name description courseImage link date categories technologies")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        courses: docs.map((doc) => {
          return {
            name: doc.name,
            description: doc.description,
            courseImage: doc.courseImage,
            link: doc.hyperlink,
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
    name: req.body.name,
    description: req.body.description,
    courseImage: req.file.path,
    link: doc.hyperlink,
    categories: doc.categories,
    technologies: doc.technologies,
  });
  course
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Course created successfully",
        createdCourse: {
          name: result.name,
          description: result.description,
          courseImage: result.courseImage,
          link: result.hyperlink,
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

router.get("/:name", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name description courseImage link date categories technologies")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          name: doc.name,
          description: doc.description,
          courseImage: doc.courseImage,
          link: doc.hyperlink,
          date: doc.date,
          categories: doc.categories,
          technologies: doc.technologies
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

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
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

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
