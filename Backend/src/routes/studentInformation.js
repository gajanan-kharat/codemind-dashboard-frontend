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
      // await sendPaymentEmail(studentInfo.email, studentInfo.firstName, studentInfo.lastName, studentInfo.batch, payments);
    }

    Object.assign(studentInfo, updateData); 
    await studentInfo.save(); 
    return res.status(200).send(studentInfo);
  } catch (error) {
    return res.status(400).send({ error: 'Error updating student information', details: error.message });
  }
});

router.get('/send-payment-email/:id', async (req, res) => {
  try {
    const studentInfo = await StudentInformation.findById(req.params.id);
    if (!studentInfo) {
      return res.status(404).send({ success: false, error: 'Student not found' });
    }

    // Check if payments array exists and has at least one entry
    const latestPayment = studentInfo.payments && studentInfo.payments.length > 0 
      ? studentInfo.payments[studentInfo.payments.length - 1] 
      : null;

    if (latestPayment) {
      try {
        // Attempt to send the email
       await sendPaymentEmail(
          studentInfo.email,
          studentInfo.firstName,
          studentInfo.lastName,
          studentInfo.batch,
          latestPayment
        );
        // Send a success response if email is sent successfully
        return res.status(200).send({ success: true, message: 'Email sent successfully' });
      } catch (emailError) {
        console.error('Error sending email:', emailError.message);
        return res.status(500).send({ success: false, error: 'Failed to send email', details: emailError.message });
      }
    } else {
      return res.status(400).send({ success: false, error: 'No payment information found for this student' });
    }
  } catch (error) {
    // Log the full error and send a response with error details
    console.error('Error retrieving student information:', error);
    res.status(500).send({ success: false, error: 'Error retrieving student information', details: error.message });
  }
});



// API Endpoint to Delete perticular Student
router.delete('/:id', async (req, res) => {
  try {
    const  deleteStudent = await StudentInformation.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error deleting user', details: error });
  }
});

/*router.get('/fees-summary', async (req, res) => {
  try {
    const { course, batch, startDate, endDate } = req.query;

    // Set the date to ensure it covers the whole day
    const from = new Date(startDate);
    from.setHours(0, 0, 0, 0); // Set to start of the day

    const to = new Date(endDate);
    to.setHours(23, 59, 59, 999); // Set to end of the day

    // Base filter object
    const filter = {};

    // Apply course and batch filters if provided
    if (course && course !== 'All') {
      filter.course = course;
    }

    if (batch && batch !== 'All') {
      filter.batch = batch;
    }

    // Date filter: payments must have been made between 'from' and 'to' dates
    if (startDate && endDate) {
      filter['payments.paymentDate'] = {
        $gte: from,
        $lte: to
      };
    }

    // Find students that match the course, batch, and date filters
    const students = await StudentInformation.find(filter);

    // Initialize a map to store aggregated data by course, batch, and payment date
    const feesSummary = {};

    students.forEach((student) => {
      const studentCourse = student.course;
      const studentBatch = student.batch;

      // Initialize the structure if course and batch is not yet in the summary
      if (!feesSummary[studentCourse]) {
        feesSummary[studentCourse] = {};
      }

      if (!feesSummary[studentCourse][studentBatch]) {
        feesSummary[studentCourse][studentBatch] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0
        };
      }

      // Aggregate the fees for each student payment within the date range
      student.payments.forEach((payment) => {
        const paymentDate = new Date(payment.paymentDate); // Ensure paymentDate is a Date object

        // Check if paymentDate falls within the specified range
        if (paymentDate >= from && paymentDate <= to) {
          feesSummary[studentCourse][studentBatch].totalFees += payment.totalFees || 0;
          feesSummary[studentCourse][studentBatch].totalPaidFees += payment.paidFees || 0;
          feesSummary[studentCourse][studentBatch].totalRemainingFees += payment.remainingFees || 0;

          // Discount is percentage-based, convert percentage into actual discount
          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            feesSummary[studentCourse][studentBatch].totalDiscount += discount;
          }

          // Discount is amount-based
          if (payment.discountAmount) {
            feesSummary[studentCourse][studentBatch].totalDiscount += payment.discountAmount;
          }
        }
      });

      // Increment student count for the current course and batch
      feesSummary[studentCourse][studentBatch].totalStudents += 1;
    });

    // Send the response with the aggregated summary
    res.status(200).json({
      data: feesSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error fetching fees summary', details: error.message });
  }
});*/

/*router.get('/fees-summary', async (req, res) => {
  try {
    const { startDate, endDate, course, batch } = req.query;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).send({ error: 'Both startDate and endDate are required' });
    }

    // Set the date to ensure it covers the whole day
    const from = new Date(startDate);
    from.setHours(0, 0, 0, 0); // Start of the day

    const to = new Date(endDate);
    to.setHours(23, 59, 59, 999); // End of the day

    // Build the query object
    const query = {
      'payments.paymentDate': {
        $gte: from,
        $lte: to
      }
    };

    // Apply course filter if provided
    // Apply course filter only if it is not 'All'
if (course && course !== 'All') {
  query.course = course;
}

// Apply batch filter only if it is not 'All'
if (batch && batch !== 'All') {
  query.batch = batch;
}

    console.log('Query Object:', query); // Log the query object for debugging

    // Find all students that have payments within the specified date range and filters
    const students = await StudentInformation.find(query);

    console.log('Students Found:', students.length); // Log the number of students found

    // Initialize a summary object to store aggregated results
    const courseSummary = {};

    students.forEach((student) => {
      const studentCourse = student.course;
      const studentBatch = student.batch;

      // Initialize the course if it doesn't exist in the summary
      if (!courseSummary[studentCourse]) {
        courseSummary[studentCourse] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0,
          batches: {}
        };
      }

      // Initialize the batch if it doesn't exist in the course summary
      if (!courseSummary[studentCourse].batches[studentBatch]) {
        courseSummary[studentCourse].batches[studentBatch] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0
        };
      }

      // Aggregate the fees for each student payment
      student.payments.forEach((payment) => {
        const paymentDate = new Date(payment.paymentDate); // Ensure paymentDate is a Date object

        // Check if paymentDate falls within the specified range
        if (paymentDate >= from && paymentDate <= to) {
          // Update the course summary
          courseSummary[studentCourse].totalFees += payment.totalFees || 0;
          courseSummary[studentCourse].totalPaidFees += payment.paidFees || 0;
          courseSummary[studentCourse].totalRemainingFees += payment.remainingFees || 0;

          // Aggregate discounts
          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            courseSummary[studentCourse].totalDiscount += discount;
          }
          if (payment.discountAmount) {
            courseSummary[studentCourse].totalDiscount += payment.discountAmount;
          }

          // Update the batch summary
          courseSummary[studentCourse].batches[studentBatch].totalFees += payment.totalFees || 0;
          courseSummary[studentCourse].batches[studentBatch].totalPaidFees += payment.paidFees || 0;
          courseSummary[studentCourse].batches[studentBatch].totalRemainingFees += payment.remainingFees || 0;

          // Update batch discounts
          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            courseSummary[studentCourse].batches[studentBatch].totalDiscount += discount;
          }
          if (payment.discountAmount) {
            courseSummary[studentCourse].batches[studentBatch].totalDiscount += payment.discountAmount;
          }

          // Increment student count for the course and batch
          courseSummary[studentCourse].totalStudents += 1;
          courseSummary[studentCourse].batches[studentBatch].totalStudents += 1;
        }
      });
    });

    // Prepare the final summary in the desired format
    const finalSummary = Object.keys(courseSummary).map((course) => ({
      course,
      totalFees: courseSummary[course].totalFees,
      totalPaidFees: courseSummary[course].totalPaidFees,
      totalRemainingFees: courseSummary[course].totalRemainingFees,
      totalDiscount: courseSummary[course].totalDiscount,
      totalStudents: courseSummary[course].totalStudents,
      batches: Object.keys(courseSummary[course].batches).map((batch) => ({
        batch,
        totalFees: courseSummary[course].batches[batch].totalFees,
        totalPaidFees: courseSummary[course].batches[batch].totalPaidFees,
        totalRemainingFees: courseSummary[course].batches[batch].totalRemainingFees,
        totalDiscount: courseSummary[course].batches[batch].totalDiscount,
        totalStudents: courseSummary[course].batches[batch].totalStudents
      }))
    }));

    // Send the response with the aggregated summary
    res.status(200).json({
      data: finalSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error fetching fees summary', details: error.message });
  }
});*/

/*router.get('/fees-summary', async (req, res) => {
  try {
    const { startDate, endDate, course, batch } = req.query;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).send({ error: 'Both startDate and endDate are required' });
    }

    const from = new Date(startDate);
    from.setHours(0, 0, 0, 0); // Start of the day
    const to = new Date(endDate);
    to.setHours(23, 59, 59, 999); // End of the day

    // Build the query object
    const query = {
      'payments.paymentDate': {
        $gte: from,
        $lte: to
      }
    };

    if (course && course !== 'All') {
      query.course = course;
    }
    if (batch && batch !== 'All') {
      query.batch = batch;
    }

    const students = await StudentInformation.find(query);
    const courseSummary = {};

    students.forEach((student) => {
      const studentCourse = student.course;
      const studentBatch = student.batch;

      if (!courseSummary[studentCourse]) {
        courseSummary[studentCourse] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0,
          batches: {}
        };
      }

      if (!courseSummary[studentCourse].batches[studentBatch]) {
        courseSummary[studentCourse].batches[studentBatch] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0
        };
      }

      student.payments.forEach((payment) => {
        const paymentDate = new Date(payment.paymentDate);

        if (paymentDate >= from && paymentDate <= to) {
          courseSummary[studentCourse].totalFees += payment.totalFees || 0;
          courseSummary[studentCourse].totalPaidFees += payment.paidFees || 0;
          courseSummary[studentCourse].totalRemainingFees += payment.remainingFees || 0;

          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            courseSummary[studentCourse].totalDiscount += discount;
          }
          if (payment.discountAmount) {
            courseSummary[studentCourse].totalDiscount += payment.discountAmount;
          }

          courseSummary[studentCourse].batches[studentBatch].totalFees += payment.totalFees || 0;
          courseSummary[studentCourse].batches[studentBatch].totalPaidFees += payment.paidFees || 0;
          courseSummary[studentCourse].batches[studentBatch].totalRemainingFees += payment.remainingFees || 0;

          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            courseSummary[studentCourse].batches[studentBatch].totalDiscount += discount;
          }
          if (payment.discountAmount) {
            courseSummary[studentCourse].batches[studentBatch].totalDiscount += payment.discountAmount;
          }

          courseSummary[studentCourse].totalStudents += 1;
          courseSummary[studentCourse].batches[studentBatch].totalStudents += 1;
        }
      });
    });

    // Generate the final summary based on the filters
    let finalSummary;
    
    if (batch === 'All') {
      // Case when course is filtered and batch is "All"
      finalSummary = Object.keys(courseSummary).map((course) => ({
        course,
        totalFees: courseSummary[course].totalFees,
        totalPaidFees: courseSummary[course].totalPaidFees,
        totalRemainingFees: courseSummary[course].totalRemainingFees,
        totalDiscount: courseSummary[course].totalDiscount,
        totalStudents: courseSummary[course].totalStudents,
        batch: 'All'  // Returning 'All' for the batch
      }));
    } else {
      // Case when both course and batch are specified
      finalSummary = Object.keys(courseSummary).map((course) => ({
        course,
        batches: Object.keys(courseSummary[course].batches).map((batch) => ({
          batch,
          totalFees: courseSummary[course].batches[batch].totalFees,
          totalPaidFees: courseSummary[course].batches[batch].totalPaidFees,
          totalRemainingFees: courseSummary[course].batches[batch].totalRemainingFees,
          totalDiscount: courseSummary[course].batches[batch].totalDiscount,
          totalStudents: courseSummary[course].batches[batch].totalStudents
        }))
      }));
    }

    res.status(200).json({
      data: finalSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error fetching fees summary', details: error.message });
  }
});*/


/*router.get('/fees-summary', async (req, res) => {
  try {
    const { startDate, endDate, course, batch } = req.query;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).send({ error: 'Both startDate and endDate are required' });
    }

    const from = new Date(startDate);
    from.setHours(0, 0, 0, 0); // Start of the day
    const to = new Date(endDate);
    to.setHours(23, 59, 59, 999); // End of the day

    // Build the query object
    const query = {
      'payments.paymentDate': {
        $gte: from,
        $lte: to
      }
    };

    if (course && course !== 'All') {
      query.course = course;
    }
    if (batch && batch !== 'All') {
      query.batch = batch;
    }

    const students = await StudentInformation.find(query);
    const courseSummary = {};

    students.forEach((student) => {
      const studentCourse = student.course;
      const studentBatch = student.batch;

      if (!courseSummary[studentCourse]) {
        courseSummary[studentCourse] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0,
        };
      }

      if (!courseSummary[`${studentCourse}_${studentBatch}`]) {
        courseSummary[`${studentCourse}_${studentBatch}`] = {
          course: studentCourse,
          batch: studentBatch,
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          totalStudents: 0
        };
      }

      student.payments.forEach((payment) => {
        const paymentDate = new Date(payment.paymentDate);

        if (paymentDate >= from && paymentDate <= to) {
          courseSummary[studentCourse].totalFees += payment.totalFees || 0;
          courseSummary[studentCourse].totalPaidFees += payment.paidFees || 0;
          courseSummary[studentCourse].totalRemainingFees += payment.remainingFees || 0;

          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            courseSummary[studentCourse].totalDiscount += discount;
          }
          if (payment.discountAmount) {
            courseSummary[studentCourse].totalDiscount += payment.discountAmount;
          }

          // Add batch-specific data
          courseSummary[`${studentCourse}_${studentBatch}`].totalFees += payment.totalFees || 0;
          courseSummary[`${studentCourse}_${studentBatch}`].totalPaidFees += payment.paidFees || 0;
          courseSummary[`${studentCourse}_${studentBatch}`].totalRemainingFees += payment.remainingFees || 0;

          if (payment.discountPercentage) {
            const discount = (payment.discountPercentage / 100) * payment.totalFees;
            courseSummary[`${studentCourse}_${studentBatch}`].totalDiscount += discount;
          }
          if (payment.discountAmount) {
            courseSummary[`${studentCourse}_${studentBatch}`].totalDiscount += payment.discountAmount;
          }

          courseSummary[studentCourse].totalStudents += 1;
          courseSummary[`${studentCourse}_${studentBatch}`].totalStudents += 1;
        }
      });
    });

    // Generate the final summary in a flat format
    let finalSummary = [];

    // Loop over all course + batch keys and add them as flat records
    Object.keys(courseSummary).forEach((key) => {
      // Skip courses without batches (used to keep total course level data if needed)
      if (key.includes('_')) {
        finalSummary.push(courseSummary[key]);
      }
    });

    res.status(200).json({
      data: finalSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error fetching fees summary', details: error.message });
  }
});
*/

router.get('/fees-summary', async (req, res) => {
  try {
    const { startDate, endDate, course, batch } = req.query;

    // Check if startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).send({ error: 'Both startDate and endDate are required' });
    }

    const from = new Date(startDate);
    from.setHours(0, 0, 0, 0); // Start of the day
    const to = new Date(endDate);
    to.setHours(23, 59, 59, 999); // End of the day

    // Build the query object
    const query = {
      'payments.paymentDate': {
        $gte: from,
        $lte: to
      }
    };

    if (course && course !== 'All') {
      query.course = course;
    }
    if (batch && batch !== 'All') {
      query.batch = batch;
    }

    const students = await StudentInformation.find(query);
    const courseSummary = {};

    students.forEach((student) => {
      const studentCourse = student.course;
      const studentBatch = student.batch;

      // Initialize course summary if not already done
      if (!courseSummary[studentCourse]) {
        courseSummary[studentCourse] = {
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          referenceAmount:0,
          totalStudents: 0,

        };
      }

      if (!courseSummary[`${studentCourse}_${studentBatch}`]) {
        courseSummary[`${studentCourse}_${studentBatch}`] = {
          course: studentCourse,
          batch: studentBatch,
          totalFees: 0,
          totalPaidFees: 0,
          totalRemainingFees: 0,
          totalDiscount: 0,
          referenceAmount: 0,
          totalStudents: 0
        };
      }

      // Filter the payments within the date range
      const filteredPayments = student.payments.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= from && paymentDate <= to;
      });

      // Check if there are any payments within the range
      if (filteredPayments.length > 0) {
        // Find the last payment in the array (most recent one)
        const lastPayment = filteredPayments[filteredPayments.length - 1];

        const { totalFees = 0, totalPaidFees = 0, remainingFees = 0, discountPercentage, discountAmount, reference } = lastPayment;

        // Update total course data
        courseSummary[studentCourse].totalFees += totalFees;
        courseSummary[studentCourse].totalPaidFees += totalPaidFees;
        courseSummary[studentCourse].totalRemainingFees += remainingFees;

        // Calculate discount
        if (discountPercentage) {
          const discount = (discountPercentage / 100) * totalFees;
          courseSummary[studentCourse].totalDiscount += discount;
        }
        if (discountAmount) {
          courseSummary[studentCourse].totalDiscount += discountAmount;
        }
        if( reference){
          courseSummary[studentCourse].referenceAmount += reference;
        }

        // Update batch-specific data
        courseSummary[`${studentCourse}_${studentBatch}`].totalFees += totalFees;
        courseSummary[`${studentCourse}_${studentBatch}`].totalPaidFees += totalPaidFees;
        courseSummary[`${studentCourse}_${studentBatch}`].totalRemainingFees += remainingFees;

        // Calculate batch-specific discount
        if (discountPercentage) {
          const discount = (discountPercentage / 100) * totalFees;
          courseSummary[`${studentCourse}_${studentBatch}`].totalDiscount += discount;
        }
        if (discountAmount) {
          courseSummary[`${studentCourse}_${studentBatch}`].totalDiscount += discountAmount;
        }

        if( reference){
          courseSummary[`${studentCourse}_${studentBatch}`].referenceAmount += reference;
        }

        // Increment total students
        courseSummary[studentCourse].totalStudents += 1;
        courseSummary[`${studentCourse}_${studentBatch}`].totalStudents += 1;
      }
    });

    // Generate the final summary in a flat format
    let finalSummary = [];

    // Loop over all course + batch keys and add them as flat records
    Object.keys(courseSummary).forEach((key) => {
      // Skip courses without batches (used to keep total course level data if needed)
      if (key.includes('_')) {
        finalSummary.push(courseSummary[key]);
      }
    });

    res.status(200).json({
      data: finalSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error fetching fees summary', details: error.message });
  }
});



module.exports = router;

