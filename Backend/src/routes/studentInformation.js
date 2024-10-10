const express = require('express');
const router = express.Router();
const multer = require('multer');
const StudentInformation = require('../models/studentInformation');
const CourseFees = require('../models/CoursesTable/fees');
const { sendPaymentEmail } = require('../routes/Email/studentPaymentEmail'); 

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
});

// API Endpoint to Update Student Information Data
/*router.put('/:id', async (req, res) => {
    try {
      const studentInfo = await StudentInformation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!studentInfo) {
        return res.status(404).send({ error: 'Student not found' });
      }
      res.status(200).send(studentInfo);
    } catch (error) {
      res.status(400).send({ error: 'Error updating student information', details: error });
    }
  });*/

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
router.put('/:id', upload.single('screenshot'), async (req, res) => {
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

