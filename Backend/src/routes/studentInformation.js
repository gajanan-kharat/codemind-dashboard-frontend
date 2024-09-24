const express = require('express');
const router = express.Router();
const StudentInformation = require('../models/studentInformation');

// API Endpoint to Save Student Information Data
router.post('/', async (req, res) => {
  try {
    const studentInfo = new StudentInformation(req.body);
    await studentInfo.save();
    res.status(201).send(studentInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error saving student information', details: error });
  }
});

// API Endpoint to Get Student Information Data
router.get('/', async (req, res) => {
  try {
    const studentInfo = await StudentInformation.find();
    res.status(200).send(studentInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student information', details: error });
  }
});

// API Endpoint to Update Student Information Data
router.put('/:id', async (req, res) => {
    try {
      const studentInfo = await StudentInformation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!studentInfo) {
        return res.status(404).send({ error: 'Student not found' });
      }
      res.status(200).send(studentInfo);
    } catch (error) {
      res.status(400).send({ error: 'Error updating student information', details: error });
    }
  });

module.exports = router;
