let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router(),
  path = require('path')
// Student Model
let studentSchema = require('../models/Student')
const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads/');

// CREATE Student
router.route('/create-student').post((req, res, next) => {
  console.log(req.body, 'req.body');
  const file = req.files.file;
  const filename = file.name;
  console.log(`${uploadFilePath}/${filename}`);

  file.mv(`${uploadFilePath}/${filename}`, (err) => {
    console.log(err)
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    //res.status(200).send({ message: "File Uploaded", code: 200 });
    
  });

  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ Students
router.route('/').get((req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-student/:id').get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.route('/update-student/:id').put((req, res, next) => {
  studentSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Student updated successfully !')
      }
    },
  )
})

// Delete Student
router.route('/delete-student/:id').delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
