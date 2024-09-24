const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/bootcamp');

// API Endpoint to Save Bootcamp Data
router.post('/', async (req, res) => {
    try {
        const bootcamp = new Bootcamp(req.body);
        await bootcamp.save();
        res.status(201).send(bootcamp);
    } catch (error) {
        res.status(400).send({ error: 'Error saving bootcamp data', details: error });
    }
});

// API Endpoint to Get All Bootcamp Data
router.get('/', async (req, res) => {
    try {
        const bootcampData = await Bootcamp.find();
        res.status(200).send(bootcampData);
    } catch (error) {
        res.status(400).send({ error: 'Error fetching bootcamp data', details: error });
    }
});

// API Endpoint to Update Bootcamp Data
router.put('/:id', async (req, res) => {
    try {
        const bootcampId = req.params.id;
        const updatedBootcamp = await Bootcamp.findByIdAndUpdate(bootcampId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedBootcamp) {
            return res.status(404).send({ error: 'Bootcamp entry not found' });
        }

        res.status(200).send(updatedBootcamp);
    } catch (error) {
        res.status(400).send({ error: 'Error updating bootcamp data', details: error });
    }
});

// API Endpoint to Delete Bootcamp Data
router.delete('/:id', async (req, res) => {
    try {
        const bootcampId = req.params.id;
        const deletedBootcamp = await Bootcamp.findByIdAndDelete(bootcampId);

        if (!deletedBootcamp) {
            return res.status(404).send({ error: 'Bootcamp entry not found' });
        }

        res.status(200).send({ message: 'Bootcamp entry deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Error deleting bootcamp data', details: error });
    }
});

module.exports = router;
