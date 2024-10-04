const express = require('express');
const router = express.Router();
const StudentMockInformation = require('../models/studentMockInformation');

router.post('/', async (req, res) => {
  try {
    const studentMockInfo = new StudentMockInformation(req.body);
    await studentMockInfo.save();
    res.status(201).send(studentMockInfo);
  } catch (error) {
    res.status(400).send({ error: 'Error saving student mock information', details: error });
  }
});

router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;  
    let studentMockInfo, totalDocuments;
    const baseFilter = searchQuery
      ? {
          $or: [
            { name: new RegExp(searchQuery, 'i') },
            { email: new RegExp(searchQuery, 'i') },
            { course: new RegExp(searchQuery, 'i') },
            { batch: new RegExp(searchQuery, 'i') },
            { graduation: new RegExp(searchQuery, 'i') },
            { contactNo: new RegExp(searchQuery, 'i') },
            { 'mocks.mockNumber': new RegExp(searchQuery, 'i') },
            { 'mocks.mockStatus': new RegExp(searchQuery, 'i') }
          ]
        }
      : {};

    totalDocuments = await StudentMockInformation.countDocuments(baseFilter);

    studentMockInfo = await StudentMockInformation.find(baseFilter)
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).send({
      totalRecords: totalDocuments,  
      totalPages,      
      currentPage: page,  
      data: studentMockInfo  
    });
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student mock information', details: error });
  }
});

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