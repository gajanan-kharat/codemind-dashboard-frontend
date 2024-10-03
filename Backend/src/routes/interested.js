const express = require('express');
const router = express.Router();
const Interested = require('../models/interested'); 
// const { sendInterestedEmail } = require('./Email/interestedEmail'); 

// POST route to create a new Interested inquiry
router.post('/', async (req, res) => {
  try {
    const interested = new Interested(req.body);
    await interested.save();

    res.status(201).send(interested);
  } catch (error) {
    res.status(400).send({ error: 'Error saving interested inquiry', details: error });
  }
});

// GET route to fetch all Interested inquiries
router.get('/', async (req, res) => {
  try {
    const interestedInquiries = await Interested.find();
    res.status(200).send(interestedInquiries);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching interested inquiries', details: error });
  }
});

// PUT route to update an Interested inquiry by ID
router.put('/:id', async (req, res) => {
  try {
    const interestedId = req.params.id;
    const updatedInterested = await Interested.findByIdAndUpdate(interestedId, req.body, { new: true, runValidators: true });

    if (!updatedInterested) {
      return res.status(404).send({ error: 'Interested inquiry not found' });
    }

    res.status(200).send(updatedInterested);
  } catch (error) {
    res.status(400).send({ error: 'Error updating interested inquiry', details: error });
  }
});

// New route for sending the email
router.post('/:id/send-email', async (req, res) => {
  try {
    const interestedId = req.params.id;
    await sendInterestedEmail(interestedId); 
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error sending email', details: error });
  }
});

module.exports = router;
