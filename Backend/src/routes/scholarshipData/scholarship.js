const express = require('express');
const router = express.Router();
const Scholarship = require('../../models/scholarshipData/scholarship');
const CourseFees = require('../../models/coursesData/fees');

// API Endpoint to Save HireUs Data
router.post('/', async (req, res) => {
  try {
    const ScholarshipData = new Scholarship(req.body);
    await ScholarshipData.save();
    res.status(201).send(ScholarshipData);
  } catch (error) {
    res.status(400).send({ error: 'Error saving Scholarship data', details: error });
  }
});

router.get('/', async (req, res) => {
    try {
      const searchQuery = req.query.search?.trim();
      const page = parseInt(req.query.page) || 1;  
      const limit = parseInt(req.query.limit) || 10;  
      const skip = (page - 1) * limit;  
      let  ScholarshipInfo , totalDocuments;
      const { scholarshipStatus } = req.query;
      const baseFilter = searchQuery
        ? {
            $or: [
              { name: new RegExp(searchQuery, 'i') }, 
              { collegeName: new RegExp(searchQuery, 'i') },
              { mobileNumbe: new RegExp(searchQuery, 'i') },
              { email: new RegExp(searchQuery, 'i') },
              { address: new RegExp(searchQuery, 'i') },
              { scholarshipStatus: new RegExp(searchQuery, 'i')},
              { interviewFeedback: new RegExp(searchQuery, 'i')}, 
              { source: new RegExp(searchQuery, 'i') },
            ]
          }
        : {};

        if ( scholarshipStatus &&  scholarshipStatus !== '') {
            baseFilter.scholarshipStatus =  scholarshipStatus;
          }

      totalDocuments = await  Scholarship.countDocuments(baseFilter);
  
      ScholarshipInfo = await  Scholarship.find(baseFilter)
        .skip(skip)
        .limit(limit);
  
      //TitleCase
      const toTitleCase = (str) => {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
      };
      
      const modifiedScholarshipInfo =  await Promise.all(
        ScholarshipInfo.map(async (student) => {
          const courseFees = await CourseFees.findOne({ name: student.course });
          return {
            ...student._doc, // Spread the student document properties
            name: toTitleCase(`${student.name}`),
            totalFees: courseFees ? courseFees.totalFees : 'Course not found', 
          };
        })
      );
  
      const totalPages = Math.ceil(totalDocuments / limit);
  
      res.status(200).send({
        totalRecords: totalDocuments,  
        totalPages,      
        currentPage: page,  
        data:modifiedScholarshipInfo
      });
    } catch (error) {
      res.status(400).send({ error: 'Error fetching Scholarship information', details: error });
    }
  });

  // Update College Info
router.put('/:id', async (req, res) => {
    try {
      const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!scholarship) {
        return res.status(404).json({ message: 'Scholarship Data not found' });
      }
      res.status(200).json(scholarship);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a College Info
  router.delete('/:id', async (req, res) => {
    try {
      const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
      if (!scholarship) {
        return res.status(404).json({ message: 'Scholarship Data not found' });
      }
      res.status(200).json({ message: 'Scholarship Data deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;