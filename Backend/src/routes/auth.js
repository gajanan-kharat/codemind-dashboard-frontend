const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/user');
const { sendUserCreationEmail } = require('../routes/usersEmail');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, mobile_number, password, role } = req.body;
  try {
    const user = new User({ firstname, lastname, email, mobile_number, password, role });
    await user.save();
    await sendUserCreationEmail(user, user.plainPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET API to retrieve all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, 'sushama', { expiresIn: '1h' });
    const fullName = `${user.firstname} ${user.lastname}`;
    res.json({ token, role: user.role , firstname: user.firstname, fullName, id: user._id});

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); 
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT request to update users data
router.put('/usersmanagement/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ message: 'Failed to update user information' });
  }
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.put('/:id',upload.fields([{ name: 'photo' }, { name: 'resume' }]), async (req, res) => {
  const { firstname, lastName, email, mobile_number, role, course, city, gitUrl, mockFeedback, attendance } = req.body;
  const updateData = {
    firstname,
    lastName,
    email,
    mobile_number,
    role,
    course,
    city,
    gitUrl,
    mockFeedback,
    attendance 
  };

  if (req.files['photo']) {
    updateData.photo = req.files['photo'][0].path;
  }

  if (req.files['resume']) {
    updateData.resume = req.files['resume'][0].path;
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
