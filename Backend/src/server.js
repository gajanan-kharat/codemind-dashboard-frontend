const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const inquiryRoutes = require('./routes/Inquiry');
const notInterestedRoutes = require('./routes/notInterested');
const interestedRoutes = require('./routes/interested');
const followUpRoutes = require('./routes/followUp');
const bootCampRoutes = require('./routes/bootcamp');
const studentInformationRoutes = require('./routes/studentInformation');
const reportRoutes = require('./routes/report');
const studentMockInformationRoutes = require('./routes/studentMockInformation');
const usersReportRoutes = require('./routes/usersReport');
const studentsReportRoutes = require('./routes/ReportGenerate/studentsreports');
const courseRoutes = require('./routes/course');
const feesRoutes = require('./routes/fees');
const totalRecordsRouter = require('./routes/totalTableRecords');

//Intialize Express
const app = express();

// mongoose.connect('mongodb://localhost:27017/roleBasedApp')
// mongoose.connect('mongodb://127.0.0.1:27017/roleBasedApp')
mongoose.connect(process.env.MONGODBURL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/reports', express.static(path.join(__dirname, 'reports')));
app.use('/usersReports', express.static(path.join(__dirname, 'usersReports')));
app.use('/studentsReports', express.static(path.join(__dirname, 'studentsReports')));

app.use('/api/auth', authRoutes);
app.use('/api/students', inquiryRoutes);
app.use('/api/notInterested',notInterestedRoutes);
app.use('/api/interested',interestedRoutes)

app.use('/api/followup', followUpRoutes);
app.use('/api/bootcamp', bootCampRoutes);
app.use('/api/studentInformation', studentInformationRoutes);
app.use('/api', reportRoutes);
app.use('/api/', usersReportRoutes);
app.use('/api/',studentsReportRoutes);
app.use('/api/studentMockInformation', studentMockInformationRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/total-records', totalRecordsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

