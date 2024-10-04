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
/*router.get('/', async (req, res) => {
  try {
    const studentInfo = await StudentInformation.find();
    res.status(200).send(studentInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student information', details: error });
  }
});*/


router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;  
    let studentInfo, totalDocuments;
    const baseFilter = searchQuery
      ? {
          $or: [
            { firstName: new RegExp(searchQuery, 'i') }, 
            { lastName: new RegExp(searchQuery, 'i') },
            { email: new RegExp(searchQuery, 'i') },
            { mobileNumber: new RegExp(searchQuery, 'i') },
            { course: new RegExp(searchQuery, 'i') },
            { batch: new RegExp(searchQuery, 'i') },
            { graduation: new RegExp(searchQuery, 'i') },
            { mock1Feedback: new RegExp(searchQuery, 'i') },
            { mock2Feedback: new RegExp(searchQuery, 'i') },
            { mock3Feedback: new RegExp(searchQuery, 'i') },
            { paymentStatus: new RegExp(searchQuery, 'i') },
            { placementStatus: new RegExp(searchQuery, 'i') },
          ]
        }
      : {};

    totalDocuments = await StudentInformation.countDocuments(baseFilter);

    studentInfo = await StudentInformation.find(baseFilter)
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).send({
      totalRecords: totalDocuments,  
      totalPages,      
      currentPage: page,  
      data: studentInfo  
    });
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
