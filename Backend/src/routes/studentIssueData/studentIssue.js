const express = require('express');
const router = express.Router();
const StudentIssue = require('../../models/studentIssueData/studentIssue');

// API Endpoint to Save Student Data
router.post('/', async (req, res) => {
  try {
    const studentIssue  = new StudentIssue(req.body);
    await studentIssue.save();
    res.status(201).send(studentIssue);
  } catch (error) {
    res.status(400).send({ error: 'Error saving student issue data', details: error });
  }
});

router.get('/', async (req, res) => {
    try {
      const searchQuery = req.query.search?.trim();
      const page = parseInt(req.query.page) || 1;  
      const limit = parseInt(req.query.limit) || 10;  
      const skip = (page - 1) * limit;  
      let StudentIssueInfo, totalDocuments;
      const { course, issueStatus, startDate, endDate} = req.query;
      const baseFilter = searchQuery
        ? {
            $or: [
              { firstName: new RegExp(searchQuery, 'i') }, 
              { lastName: new RegExp(searchQuery, 'i') },
              { email: new RegExp(searchQuery, 'i') },
              { mobileNumber: new RegExp(searchQuery, 'i') },
              { course: new RegExp(searchQuery, 'i') },
              { issueStatus: new RegExp(searchQuery, 'i') },
              { batch: new RegExp(searchQuery, 'i') },
              { source: new RegExp(searchQuery, 'i') },
              { 'assignedMentor.mentorName': new RegExp(searchQuery, 'i') },
            ]
          }
        : {};

        if (course && course !== 'All') {
          baseFilter.course = course;
        }
  
        if ( issueStatus &&  issueStatus !== 'All') {
          baseFilter. issueStatus =  issueStatus;
        }
  
        if (startDate) {
          baseFilter.date = { ...baseFilter.issue_created_date, $gte: new Date(startDate) };
        }
  
        if (endDate) {
          baseFilter.date = { ...baseFilter.issue_created_date, $lte: new Date(endDate) };
        }
    
      totalDocuments = await  StudentIssue.countDocuments(baseFilter);
  
      StudentIssueInfo = await StudentIssue.find(baseFilter)
        .skip(skip)
        .limit(limit);
  
       //TitleCase
       const toTitleCase = (str) => {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
      };
      
       const modifiedStudentIssueInfo =  StudentIssueInfo.map(user => ({
        ...user.toObject(),  
        name: toTitleCase(`${user.firstName} ${user.lastName}`)  
      }));
  
      const totalPages = Math.ceil(totalDocuments / limit);
  
      res.status(200).send({
        totalRecords: totalDocuments,  
        totalPages,      
        currentPage: page,  
        data: modifiedStudentIssueInfo
      });
    } catch (error) {
      res.status(400).send({ error: 'Error fetching Student Issue', details: error });
    }
  });
  
  
  // API Endpoint to Update Follow-Up Data
  router.put('/:id', async (req, res) => {
      try {
        const studentIssueId = req.params.id;
        const updatedStudentIssue = await StudentIssue.findByIdAndUpdate(studentIssueId, req.body, { new: true, runValidators: true, });
    
        if (!updatedStudentIssue) {
          return res.status(404).send({ error: 'Student Issue not found' });
        }
    
        res.status(200).send(updatedStudentIssue);
      } catch (error) {
        res.status(400).send({ error: 'Error updating Student Issue data', details: error });
      }
    });
  
    // API Endpoint to Delete perticular Student
  router.delete('/:id', async (req, res) => {
    try {
      const  deleteStudent = await StudentIssue.findByIdAndDelete(req.params.id);
      if (!deleteStudent) {
        return res.status(404).send({ error: 'Student not found' });
      }
      res.status(200).send({ message: 'FollowUp Student deleted successfully' });
    } catch (error) {
      res.status(400).send({ error: 'Error deleting FollowUp Student', details: error });
    }
  });
  
  module.exports = router;