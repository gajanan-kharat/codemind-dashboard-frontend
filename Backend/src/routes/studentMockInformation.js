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

/*router.get('/', async (req, res) => {
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
});*/

router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;
  
    const { batch, course, mockNumber, mockStatus } = req.query;
    
    // Build the base filter with search query
    let baseFilter = searchQuery
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

    // Apply filters to the base query
    if (batch && batch !== 'All') {
      baseFilter.batch = batch;
    }

    if (course && course !== '') {
      baseFilter.course = course;
    }

    if (mockNumber && parseInt(mockNumber) > 0) {
      const mockNumberStr = `Mock-${mockNumber}`; 
      baseFilter['mocks.mockNumber'] = mockNumberStr; 
    }
 
    // if (mockStatus && mockStatus !== 'All') {
    //   baseFilter['mocks.mockStatus'] = new RegExp(mockStatus, 'i');
    // }

    if (mockStatus && mockStatus !== 'All') {
      if (mockStatus === 'Pending') {
        // Handle the case for 'Pending'
        baseFilter['$or'] = [
          { 'mocks': { $exists: false } }, // Mocks field does not exist
          { 'mocks': { $size: 0 } },       // Mocks array is empty
          { 'mocks.mockNumber': { $exists: false } } // Mock number is not defined
        ];
      } else {
        // For other statuses, match by mock status and mock number
        baseFilter['mocks'] = {
          $elemMatch: {
            mockStatus: new RegExp(mockStatus, 'i')
          }
        };
      }
    }

    /*if (mockStatus && mockStatus !== 'All') {
      const mockNumberStr = `Mock-${mockNumber}`; // Construct the specific mock number (e.g., Mock-1)
      console.log("mockNumberStr :=>", mockNumberStr);
    
      if (mockStatus === 'Pending') {
        // Handle the case for 'Pending'
        baseFilter['$or'] = [
          { 'mocks': { $exists: false } }, // Mocks field does not exist
          { 'mocks': { $size: 0 } },       // Mocks array is empty
          { 'mocks.mockNumber': { $exists: false } }, // Mock number is not defined
          {
            'mocks': {
              $not: {
                $elemMatch: {
                  mockStatus: { $ne: 'Pending' } // Exclude any mock with a status that is NOT 'Pending'
                }
              }
            }
          },
          {
            'mocks': {
              $elemMatch: {
                mockNumber: mockNumberStr,  // Check for the specific mock number
                $or: [
                  { mockStatus: { $exists: false } }, // Mock status is not defined
                  { mockStatus: null } // Mock status is null
                ]
              }
            }
          },
          {
            'mocks': {
              $elemMatch: {
                mockNumber: { $in: [`Mock-1`, `Mock-2`, `Mock-3`, `Mock-4`] }, // Check for any of the mock numbers
                $or: [
                  { mockStatus: { $exists: false } }, // Mock status is not defined
                  { mockStatus: null } // Mock status is null
                ]
              }
            }
          }
        ];
      } else {
        // For other statuses (e.g., 'Excellent', 'Good'), we directly match the mock number and status
        baseFilter['mocks'] = {
          $elemMatch: {
            mockNumber: mockNumberStr, // Filter by specific mock number (e.g., Mock-1)
            mockStatus: new RegExp(mockStatus, 'i') // Filter by mockStatus (case-insensitive)
          }
        };
      }
    }*/
    
    // Count the total number of documents that match the filter
    const totalDocuments = await StudentMockInformation.countDocuments(baseFilter);

    // Fetch the filtered documents with pagination
    const studentMockInfo = await StudentMockInformation.find(baseFilter)
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