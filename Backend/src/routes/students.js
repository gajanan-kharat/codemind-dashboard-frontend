const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// API Endpoint to Save Student Data
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Error saving student data', details: error });
  }
});

// API Endpoint to Get Student Information Data
router.get('/', async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student information', details: error });
  }
});

// API Endpoint to Update Student Data
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Error updating student data', details: error });
  }
});

// API Endpoint to Delete Student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.status(200).send({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error deleting student', details: error });
  }
});

module.exports = router;
