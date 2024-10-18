const express = require('express');
const router = express.Router();
const multer = require('multer');
const StudentInformation = require('../models/studentInformation');
const CourseFees = require('../models/CoursesTable/fees');
const { sendPaymentEmail } = require('../routes/Email/studentPaymentEmail'); 

// API Endpoint to Save Student Information Data
router.post('/', async (req, res) => {
  // console.log("confirm data:=>", req.body);
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

/*router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit; 

    const { batch, course, feedback, paymentStatus, placementStatus } = req.query;

    let studentInfo, totalDocuments;
    
    // Extract filter parameters from the request
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
            { placementStatus: new RegExp(searchQuery, 'i') },
            {
              'payments.paymentStatus': new RegExp(searchQuery, 'i'), 
            }
          ]
        }
      : {};

      // Apply filters for batch, course, feedback, paymentStatus, and placementStatus
      if (batch && batch !== 'All') {
        baseFilter.batch = batch;
      }
  
      if (course && course !== '') {
        baseFilter.course = course;
      }
  
      if (feedback && feedback !== 'All') {
        baseFilter.overallFeedback = feedback; 
      }
  
      if (paymentStatus && paymentStatus !== 'All') {
        if (paymentStatus === 'Not Paid') {
          // If "Not Paid" is selected, filter students without payments or paymentStatus not set
          baseFilter.$or = [
            { 'payments': { $exists: false } },
            { 'payments': { $size: 0 } },       
            { 'payments.paymentStatus': { $exists: false } }, 
            { 'payments.paymentStatus': 'Not Paid' } 
          ];
        } else {
          // For other payment statuses, filter as usual
          baseFilter.$or = [
            { 'payments.paymentStatus': paymentStatus }
          ];
        }
      }
      
  
      if (placementStatus && placementStatus !== 'All') {
        baseFilter.placementStatus = placementStatus;
      }

    totalDocuments = await StudentInformation.countDocuments(baseFilter);

    studentInfo = await StudentInformation.find(baseFilter)
      .skip(skip)
      .limit(limit);

         const studentInfoWithFees = await Promise.all(
        studentInfo.map(async (student) => {
          const course = await CourseFees.findOne({ name: student.course });
          return {
            ...student.toObject(),
            totalFees: course ? course.totalFees : 'Course not found',  
          };
        })
      );
 
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).send({
      totalRecords: totalDocuments,  
      totalPages,      
      currentPage: page,  
      data: studentInfoWithFees 
    });
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student information', details: error });
  }
});*/

/*router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { batch, course, feedback, paymentStatus, placementStatus } = req.query;

    let studentInfo, totalDocuments;

    // Base filter setup
    const baseFilter = {
      ...(searchQuery ? {
        $or: [
          { firstName: new RegExp(searchQuery, 'i') },
          { lastName: new RegExp(searchQuery, 'i') },
          { email: new RegExp(searchQuery, 'i') },
          { mobileNumber: new RegExp(searchQuery, 'i') },
          { course: new RegExp(searchQuery, 'i') },
          { batch: new RegExp(searchQuery, 'i') },
          { graduation: new RegExp(searchQuery, 'i') },
          { placementStatus: new RegExp(searchQuery, 'i') },
          { 'payments.paymentStatus': new RegExp(searchQuery, 'i') },
        ]
      } : {})
    };

    // Apply filters for batch, course, paymentStatus, and placementStatus
    if (batch && batch !== 'All') {
      baseFilter.batch = batch;
    }

    if (course && course !== '') {
      baseFilter.course = course;
    }

    if (paymentStatus && paymentStatus !== 'All') {
      if (paymentStatus === 'Not Paid') {
        baseFilter.$or = [
          { 'payments': { $exists: false } },
          { 'payments': { $size: 0 } },
          { 'payments.paymentStatus': { $exists: false } },
          { 'payments.paymentStatus': 'Not Paid' }
        ];
      } else {
        baseFilter.$or = [{ 'payments.paymentStatus': paymentStatus }];
      }
    }

    if (placementStatus && placementStatus !== 'All') {
      baseFilter.placementStatus = placementStatus;
    }

    // Get the total count of documents without feedback filtering
    totalDocuments = await StudentInformation.countDocuments(baseFilter);

    studentInfo = await StudentInformation.find(baseFilter)
      .skip(skip)
      .limit(limit);

    // Function to calculate overall feedback based on mock feedback
    const calculateOverallFeedback = (student) => {
      const feedbackScores = { Poor: 1, Average: 2, Good: 3, Excellent: 4 };
      const mock1Score = feedbackScores[student.mock1Feedback] || 0;
      const mock2Score = feedbackScores[student.mock2Feedback] || 0;
      const mock3Score = feedbackScores[student.mock3Feedback] || 0;
    
      const totalScore = mock1Score + mock2Score + mock3Score;
      const feedbackCount = [mock1Score, mock2Score, mock3Score].filter(score => score > 0).length || 1; // Avoid division by zero

      const averageScore = totalScore / feedbackCount;

      if (averageScore <= 1.5) return 'Poor';
      if (averageScore <= 2.5) return 'Average';
      if (averageScore <= 3.5) return 'Good';
      return 'Excellent';
    };

    // Map over student data to calculate overall feedback
    const studentInfoWithFeedback = studentInfo.map(student => ({
      ...student.toObject(),
      overallFeedback: calculateOverallFeedback(student), // Add calculated feedback
    }));

    // Apply feedback filter if provided
    let filteredStudents = studentInfoWithFeedback;
    if (feedback && feedback !== 'All') {
      filteredStudents = studentInfoWithFeedback.filter(
        (student) => student.overallFeedback === feedback
      );
    }
    console.log("filteredStudents",filteredStudents);

    // Calculate the filtered count
    const filteredCount = filteredStudents.length;

    // Add course fees information
    const studentInfoWithFees = await Promise.all(
      filteredStudents.map(async (student) => {
        const courseFees = await CourseFees.findOne({ name: student.course });
        return {
          ...student,
          totalFees: courseFees ? courseFees.totalFees : 'Course not found',
        };
      })
    );

    // Calculate total pages based on the filtered count if feedback is applied
    const totalPages = Math.ceil(
      (feedback && feedback !== 'All' ? filteredCount : totalDocuments) / limit
    );

    // Send response
    res.status(200).send({
      totalRecords: feedback && feedback !== 'All' ? filteredCount : totalDocuments, // Total after feedback filter, otherwise the full count
      totalPages,
      currentPage: page,
      data: studentInfoWithFees,
    });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    res.status(400).send({ error: 'Error fetching student information', details: error.message });
  }
});*/


router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { batch, course, feedback, paymentStatus, placementStatus } = req.query;

    let studentInfo, totalDocuments;

    // Base filter setup
    const baseFilter = {
      ...(searchQuery ? {
        $or: [
          { firstName: new RegExp(searchQuery, 'i') },
          { lastName: new RegExp(searchQuery, 'i') },
          { email: new RegExp(searchQuery, 'i') },
          { mobileNumber: new RegExp(searchQuery, 'i') },
          { course: new RegExp(searchQuery, 'i') },
          { batch: new RegExp(searchQuery, 'i') },
          { graduation: new RegExp(searchQuery, 'i') },
          { placementStatus: new RegExp(searchQuery, 'i') },
          { 'payments.paymentStatus': new RegExp(searchQuery, 'i') },
        ]
      } : {})
    };

    // Apply filters for batch, course, paymentStatus, and placementStatus
    if (batch && batch !== 'All') {
      baseFilter.batch = batch;
    }

    if (course && course !== '') {
      baseFilter.course = course;
    }

    if (paymentStatus && paymentStatus !== 'All') {
      if (paymentStatus === 'Not Paid') {
        baseFilter.$or = [
          { 'payments': { $exists: false } },
          { 'payments': { $size: 0 } },
          { 'payments.paymentStatus': { $exists: false } },
          { 'payments.paymentStatus': 'Not Paid' }
        ];
      } else {
        baseFilter.$or = [{ 'payments.paymentStatus': paymentStatus }];
      }
    }

    if (placementStatus && placementStatus !== 'All') {
      baseFilter.placementStatus = placementStatus;
    }

    // Get all student records without pagination for feedback filtering
    const allStudents = await StudentInformation.find(baseFilter);

    // Function to calculate overall feedback based on mock feedback
    const calculateOverallFeedback = (student) => {
      const feedbackScores = { Poor: 1, Average: 2, Good: 3, Excellent: 4 };
      const mock1Score = feedbackScores[student.mock1Feedback] || 0;
      const mock2Score = feedbackScores[student.mock2Feedback] || 0;
      const mock3Score = feedbackScores[student.mock3Feedback] || 0;
    
      const totalScore = mock1Score + mock2Score + mock3Score;
      const feedbackCount = [mock1Score, mock2Score, mock3Score].filter(score => score > 0).length || 1; // Avoid division by zero

      const averageScore = totalScore / feedbackCount;

      if (averageScore <= 1.5) return 'Poor';
      if (averageScore <= 2.5) return 'Average';
      if (averageScore <= 3.5) return 'Good';
      return 'Excellent';
    };

    // Apply feedback filtering globally on all student data
    const studentsWithFeedback = allStudents.map(student => ({
      ...student.toObject(),
      overallFeedback: calculateOverallFeedback(student), // Add calculated feedback
    }));

    // Apply feedback filter if provided
    let filteredStudents = studentsWithFeedback;
    if (feedback && feedback !== 'All') {
      filteredStudents = studentsWithFeedback.filter(
        (student) => student.overallFeedback === feedback
      );
    }

    // After applying feedback filter, continue with pagination and other filters
    totalDocuments = filteredStudents.length;

    // Apply pagination to filtered students
    const paginatedStudents = filteredStudents.slice(skip, skip + limit);

    //TitleCase
    const toTitleCase = (str) => {
      return str.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
    };

    // Add course fees information
    const studentInfoWithFees = await Promise.all(
      paginatedStudents.map(async (student) => {
        const courseFees = await CourseFees.findOne({ name: student.course });
        return {
          ...student,
          name: toTitleCase(`${student.firstName} ${student.lastName}`),
          totalFees: courseFees ? courseFees.totalFees : 'Course not found',
        };
      })
    );

    // Calculate total pages based on filtered count
    const totalPages = Math.ceil(totalDocuments / limit);

    // Send response
    res.status(200).send({
      totalRecords: totalDocuments,  
      totalPages,
      currentPage: page,
      data: studentInfoWithFees,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error fetching student information', details: error.message });
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

  // API Endpoint to Update Student Information Data
/*router.put('/:id', async (req, res) => {
  try {
      const { payments } = req.body; 
      const updateData = {};

      if (payments) {
          const studentInfo = await StudentInformation.findById(req.params.id);
          if (!studentInfo) {
              return res.status(404).send({ error: 'Student not found' });
          }
          payments.forEach(payment => {
              studentInfo.payments.push(payment);
          });
          await studentInfo.save();
          return res.status(200).send(studentInfo);
      }

      const studentInfo = await StudentInformation.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
      });

      if (!studentInfo) {
          return res.status(404).send({ error: 'Student not found' });
      }

      res.status(200).send(studentInfo);
  } catch (error) {
      res.status(400).send({ error: 'Error updating student information', details: error });
  }
});*/


// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});
const upload = multer({ storage: storage });

// API Endpoint to Update Student Information Data
router.put('/payments/:id', upload.single('screenshot'), async (req, res) => {
  try {
    const { payments, ...updateData } = req.body; 
    // console.log("payments and updated data:=>",req.body);

    if (req.file) {

      const screenshotPath = req.file.path; 
      payments.forEach(payment => {
        payment.screenshot = screenshotPath;
      });
    }

    const studentInfo = await StudentInformation.findById(req.params.id);
    if (!studentInfo) {
      return res.status(404).send({ error: 'Student not found' });
    }

    if (payments) {
      payments.forEach(payment => {
        const existingPaymentIndex = studentInfo.payments.findIndex(p => p.reference === payment.reference);
        const newPayment = {
          ...payment,
          timestamp: new Date() 
        };

        if (existingPaymentIndex !== -1) {
          studentInfo.payments.push(newPayment);
        } else {
      
          studentInfo.payments.push(newPayment);
        }
      });
      await sendPaymentEmail(studentInfo.email, studentInfo.firstName, studentInfo.lastName, studentInfo.batch, payments);
    }

    Object.assign(studentInfo, updateData); 
    await studentInfo.save(); 
    return res.status(200).send(studentInfo);
  } catch (error) {
    return res.status(400).send({ error: 'Error updating student information', details: error.message });
  }
});

module.exports = router;

