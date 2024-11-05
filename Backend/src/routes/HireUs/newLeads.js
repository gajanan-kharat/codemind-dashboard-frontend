const express = require('express');
const router = express.Router();
const HireUsData = require('../../models/HireUs/newLeads');

// API Endpoint to Save Student Data
router.post('/', async (req, res) => {
  try {
    const student = new HireUsData(req.body);
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
            { name: new RegExp(searchQuery, 'i') }, 
            { company: new RegExp(searchQuery, 'i') },
            { email: new RegExp(searchQuery, 'i') },
            { mobileNumber: new RegExp(searchQuery, 'i') },
            // { course: new RegExp(searchQuery, 'i') },
          ]
        }
      : {};

      if (course && course !== 'All') {
        baseFilter.course = course;
      }

    totalDocuments = await  HireUsData.countDocuments(baseFilter);

    student = await  HireUsData.find(baseFilter)
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
      name: toTitleCase(`${user.name}`)  
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
    const student = await  HireUsData.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ error: 'Error updating student data', details: error });
  }
});

// API Endpoint to Delete HireUs
router.delete('/:id', async (req, res) => {
  try {
    const student = await  HireUsData.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'HireUs not found' });
    }
    res.status(200).send({ message: 'HireUs deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error deleting HireUs', details: error });
  }
});

module.exports = router;
