const express = require('express');
const router = express.Router();
const StudentMockInformation = require('../models/studentMockInformation');

// API Endpoint to Save Student Mock Information Data
router.post('/', async (req, res) => {
  try {
    const studentMockInfo = new StudentMockInformation(req.body);
    await studentMockInfo.save();
    res.status(201).send(studentMockInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error saving student mock information', details: error });
  }
});

// API Endpoint to Get Student Mock Information Data
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim(); // Optional chaining and trimming the search query
    let studentMockInfo;

    if (searchQuery) {
      // If there's a search query, build a regex and perform the search
      const regex = new RegExp(searchQuery, 'i');
      studentMockInfo = await StudentMockInformation.find({
        $or: [
          { name: regex },
          { email: regex },
          { course: regex },
          { batch: regex },
          { graduation: regex },
          { contactNo: regex },
          // { passingYear: regex },
          { 'mocks.mockNumber': regex },
          { 'mocks.mockStatus': regex }
        ]
      });
    } else {
      // If no search query, return all records
      studentMockInfo = await StudentMockInformation.find();
    }

    // Log details for debugging
    console.log('Search Query:', searchQuery);
    console.log('Returned student mock info:', studentMockInfo);

    res.status(200).send(studentMockInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student mock information', details: error });
  }
});

// API Endpoint to Update Student Mock Information Data
router.put('/:id', async (req, res) => {
  try {
    const studentMockInfo = await StudentMockInformation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!studentMockInfo) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.status(200).send(studentMockInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error updating student mock information', details: error });
  }
});

module.exports = router;