const express = require('express');
const { getDb } = require('../models/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  const db = getDb();
  
  db.get('SELECT id, email, name, major, year, bio FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get interests
    db.all('SELECT interest FROM user_interests WHERE user_id = ?', [req.user.id], (err, interests) => {
      if (err) interests = [];

      // Get courses
      db.all('SELECT course_code, course_name FROM user_courses WHERE user_id = ?', [req.user.id], (err, courses) => {
        if (err) courses = [];

        res.json({
          ...user,
          interests: interests.map(i => i.interest),
          courses: courses
        });
      });
    });
  });
});

// Update user profile
router.put('/me', authenticateToken, (req, res) => {
  const { name, major, year, bio, interests, courses } = req.body;
  const db = getDb();

  db.run(
    'UPDATE users SET name = ?, major = ?, year = ?, bio = ? WHERE id = ?',
    [name, major, year, bio, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error updating profile' });
      }

      // Update interests (using transaction for consistency)
      if (interests && Array.isArray(interests)) {
        db.serialize(() => {
          db.run('BEGIN TRANSACTION');
          db.run('DELETE FROM user_interests WHERE user_id = ?', [req.user.id]);
          interests.forEach(interest => {
            db.run('INSERT INTO user_interests (user_id, interest) VALUES (?, ?)', [req.user.id, interest]);
          });
          db.run('COMMIT');
        });
      }

      // Update courses (using transaction for consistency)
      if (courses && Array.isArray(courses)) {
        db.serialize(() => {
          db.run('BEGIN TRANSACTION');
          db.run('DELETE FROM user_courses WHERE user_id = ?', [req.user.id]);
          courses.forEach(course => {
            db.run('INSERT INTO user_courses (user_id, course_code, course_name) VALUES (?, ?, ?)', 
              [req.user.id, course.code, course.name]);
          });
          db.run('COMMIT');
        });
      }

      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// Get user by ID
router.get('/:userId', authenticateToken, (req, res) => {
  const db = getDb();
  
  db.get('SELECT id, name, major, year, bio FROM users WHERE id = ?', [req.params.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get interests
    db.all('SELECT interest FROM user_interests WHERE user_id = ?', [req.params.userId], (err, interests) => {
      if (err) interests = [];

      // Get courses
      db.all('SELECT course_code, course_name FROM user_courses WHERE user_id = ?', [req.params.userId], (err, courses) => {
        if (err) courses = [];

        res.json({
          ...user,
          interests: interests.map(i => i.interest),
          courses: courses
        });
      });
    });
  });
});

module.exports = router;
