const express = require('express');
const router = express.Router();
const FollowUp = require('../models/followUp');
const Student = require('../models/student');

// API Endpoint to Save Student Data
router.post('/', async (req, res) => {
  try {
    const followup = new FollowUp(req.body);
    await followup.save();
    res.status(201).send(followup);
  } catch (error) {
    res.status(400).send({ error: 'Error saving student data', details: error });
  }
});

// API Endpoint to Get Student Information Data
router.get('/', async (req, res) => {
  try {
    const followup = await FollowUp.find();
    res.status(200).send(followup);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching student information', details: error });
  }
});

// API Endpoint to Update Follow-Up Data
router.put('/:id', async (req, res) => {
    try {
      const followUpId = req.params.id;
      const updatedFollowUp = await FollowUp.findByIdAndUpdate(followUpId, req.body, { new: true, runValidators: true, });
  
      if (!updatedFollowUp) {
        return res.status(404).send({ error: 'Follow-up not found' });
      }
  
      res.status(200).send(updatedFollowUp);
    } catch (error) {
      res.status(400).send({ error: 'Error updating follow-up data', details: error });
    }
  });

module.exports = router;