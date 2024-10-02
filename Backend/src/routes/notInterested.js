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

router.get('/', async (req, res) => {
  try {
    const notInterestedInquiries = await NotInterested.find();
    res.status(200).send(notInterestedInquiries);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching not interested inquiries', details: error });
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
