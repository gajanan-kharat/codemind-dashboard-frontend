/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/roleBasedApp')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:',err));

app.use(cors());
app.use(bodyParser.json());

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  course: String
});

const Student = mongoose.model('Student', studentSchema);


// API Endpoint to Save Student Data
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});


const studentInformationSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  batch: String 
});

const StudentInformation = mongoose.model('studentInformation', studentInformationSchema);

// API Endpoint to Save Student Data
app.post('/api/studentInformation', async (req, res) => {
  try {
    const studentInfo = new StudentInformation(req.body);
    await studentInfo.save();
    res.status(201).send(studentInfo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// API Endpoint to Get Student Information Data
app.get('/api/studentInformation', async (req, res) => {
  try {
    const studentInfor = await StudentInformation.find();
    res.status(200).send(studentInfor);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/studentInformation/:id', async (req, res) => {
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


app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const followUpRoutes = require('./routes/followUp');
const bootCampRoutes = require('./routes/bootcamp');
const studentInformationRoutes = require('./routes/studentInformation');
const reportRoutes = require('./routes/report');
const studentMockInformationRoutes = require('./routes/studentMockInformation');

const app = express();

// mongoose.connect('mongodb://localhost:27017/roleBasedApp')
mongoose.connect('mongodb://127.0.0.1:27017/roleBasedApp')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/reports', express.static(path.join(__dirname, 'reports')));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/followup', followUpRoutes);
app.use('/api/bootcamp', bootCampRoutes);
app.use('/api/studentInformation', studentInformationRoutes);
app.use('/api', reportRoutes);
app.use('/api/studentMockInformation', studentMockInformationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

