const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../models/database');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { email, password, name, major, year, courses, interests } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    db.run(
      'INSERT INTO users (id, email, password, name, major, year) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, email, hashedPassword, name, major || null, year || null],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: 'Error creating user' });
        }

        // Add courses if provided
        if (courses && Array.isArray(courses)) {
          courses.forEach(course => {
            db.run(
              'INSERT INTO user_courses (user_id, course_code, course_name) VALUES (?, ?, ?)',
              [userId, course.code, course.name]
            );
          });
        }

        // Add interests if provided
        if (interests && Array.isArray(interests)) {
          interests.forEach(interest => {
            db.run(
              'INSERT INTO user_interests (user_id, interest) VALUES (?, ?)',
              [userId, interest]
            );
          });
        }

        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: { id: userId, email, name, major, year }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = getDb();
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        major: user.major,
        year: user.year
      }
    });
  });
});

module.exports = router;
