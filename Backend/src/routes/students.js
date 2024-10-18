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
/*router.get('/', async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).send(student);
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
    let student, totalDocuments;
    const { course } = req.query;
    const baseFilter = searchQuery
      ? {
          $or: [
            { firstName: new RegExp(searchQuery, 'i') }, 
            { lastName: new RegExp(searchQuery, 'i') },
            { email: new RegExp(searchQuery, 'i') },
            { mobileNumber: new RegExp(searchQuery, 'i') },
            { course: new RegExp(searchQuery, 'i') },
          ]
        }
      : {};

      if (course && course !== 'All') {
        baseFilter.course = course;
      }

    totalDocuments = await Student.countDocuments(baseFilter);

    student = await Student.find(baseFilter)
      .skip(skip)
      .limit(limit);

    //TitleCase
    const toTitleCase = (str) => {
      return str.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
    };
    
    const modifiedStudentInfo =  student.map(user => ({
      ...user.toObject(),  
      name: toTitleCase(`${user.firstName} ${user.lastName}`)  
    }));

    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).send({
      totalRecords: totalDocuments,  
      totalPages,      
      currentPage: page,  
      data:modifiedStudentInfo
    });
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
