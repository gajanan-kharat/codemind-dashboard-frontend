const express = require('express');
const router = express.Router();
const NotInterested = require('../models/notInterested'); 
const { sendNotInterestedEmail } = require('./Email/notInterestedEmail');


router.post('/', async (req, res) => {
  try {
    const notInterested = new NotInterested(req.body);
    await notInterested.save();
    res.status(201).send(notInterested);
  } catch (error) {
    res.status(400).send({ error: 'Error saving not interested inquiry', details: error });
  }
});

/*router.get('/', async (req, res) => {
  try {
    const notInterestedInquiries = await NotInterested.find();
    res.status(200).send(notInterestedInquiries);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching not interested inquiries', details: error });
  }
});*/

router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim();
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;  
    let  NotInterestedInfo, totalDocuments;
    const baseFilter = searchQuery
      ? {
          $or: [
            { firstName: new RegExp(searchQuery, 'i') }, 
            { lastName: new RegExp(searchQuery, 'i') },
            { email: new RegExp(searchQuery, 'i') },
            { mobileNumber: new RegExp(searchQuery, 'i') },
            { course: new RegExp(searchQuery, 'i') },
            { source: new RegExp(searchQuery, 'i') },
          ]
        }
      : {};

    totalDocuments = await NotInterested.countDocuments(baseFilter);
    
    NotInterestedInfo = await NotInterested.find(baseFilter)
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).send({
      totalRecords: totalDocuments,  
      totalPages,      
      currentPage: page,  
      data: NotInterestedInfo 
    });
  } catch (error) {
    res.status(400).send({ error: 'Error fetching followup student information', details: error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const notInterestedId = req.params.id;
    const updatedNotInterested = await NotInterested.findByIdAndUpdate(notInterestedId, req.body, { new: true, runValidators: true });
    
  
    if (!updatedNotInterested) {
      return res.status(404).send({ error: 'Not Interested inquiry not found' });
    }

    // await sendNotInterestedEmail(notInterestedId);

    res.status(200).send(updatedNotInterested);
  } catch (error) {
    res.status(400).send({ error: 'Error updating not interested inquiry', details: error });
  }
});

// New route for sending the email
router.post('/:id/send-email', async (req, res) => {
  try {
    const notInterestedId = req.params.id;
    await sendNotInterestedEmail(notInterestedId);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error sending email', details: error });
  }
});

module.exports = router;
