const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const HireUsNewLeads = require('../../models/HireUs/newLeads'); 
const NotInterested = require('../../models/HireUs/interested');
const Interested = require('../../models/HireUs/notInterested');
const FollowUp = require('../../models/HireUs/followUp');


router.get('/', async (req, res) => {
  try {
    const [HireUsCount, notInterestedCount, interestedCount, followUpCount] = await Promise.all([
      HireUsNewLeads.countDocuments(),
      NotInterested.countDocuments(),
      Interested.countDocuments(),
      FollowUp.countDocuments(),
    ]);

    const totalCounts = {
      HireUsNewLeads: HireUsCount,
      notInterested: notInterestedCount,
      interested: interestedCount,
      followUp: followUpCount,
    };

    console.log("total records:=>",totalCounts);

    res.status(200).json(totalCounts);
  } catch (error) {
    console.error('Error fetching total records:', error);
    res.status(500).send({ error: 'Error fetching total records' });
  }
});

module.exports = router;
