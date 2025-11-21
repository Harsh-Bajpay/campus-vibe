const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../models/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Find matching peers for study groups based on courses and interests
router.get('/peers', authenticateToken, (req, res) => {
  const db = getDb();

  // Get current user's courses and interests
  db.all('SELECT course_code FROM user_courses WHERE user_id = ?', [req.user.id], (err, userCourses) => {
    if (err) userCourses = [];

    db.all('SELECT interest FROM user_interests WHERE user_id = ?', [req.user.id], (err, userInterests) => {
      if (err) userInterests = [];

      const courseCodes = userCourses.map(c => c.course_code);
      const interests = userInterests.map(i => i.interest);

      // Find users with matching courses or interests
      const matchingUsers = [];
      const processedUsers = new Set();

      // Match by courses
      if (courseCodes.length > 0) {
        const placeholders = courseCodes.map(() => '?').join(',');
        db.all(
          `SELECT DISTINCT u.id, u.name, u.major, u.year, uc.course_code,
          (SELECT GROUP_CONCAT(course_code) FROM user_courses WHERE user_id = u.id) as all_courses,
          (SELECT GROUP_CONCAT(interest) FROM user_interests WHERE user_id = u.id) as all_interests
          FROM users u
          JOIN user_courses uc ON u.id = uc.user_id
          WHERE uc.course_code IN (${placeholders}) AND u.id != ?`,
          [...courseCodes, req.user.id],
          (err, courseMatches) => {
            if (!err && courseMatches) {
              courseMatches.forEach(match => {
                if (!processedUsers.has(match.id)) {
                  const matchedCourses = match.all_courses ? match.all_courses.split(',').filter(c => courseCodes.includes(c)) : [];
                  const matchedInterests = match.all_interests ? match.all_interests.split(',').filter(i => interests.includes(i)) : [];
                  
                  const score = (matchedCourses.length * 2) + matchedInterests.length;
                  
                  matchingUsers.push({
                    ...match,
                    matched_courses: matchedCourses,
                    matched_interests: matchedInterests,
                    match_score: score,
                    match_reason: `${matchedCourses.length} shared course(s), ${matchedInterests.length} shared interest(s)`
                  });
                  processedUsers.add(match.id);
                }
              });
            }

            // Sort by match score
            matchingUsers.sort((a, b) => b.match_score - a.match_score);
            res.json({ matches: matchingUsers.slice(0, 20) });
          }
        );
      } else {
        res.json({ matches: [] });
      }
    });
  });
});

// Get personalized suggestions
router.get('/suggestions', authenticateToken, (req, res) => {
  const db = getDb();

  // Get user's courses and interests
  db.all('SELECT course_code FROM user_courses WHERE user_id = ?', [req.user.id], (err, userCourses) => {
    if (err) userCourses = [];

    db.all('SELECT interest FROM user_interests WHERE user_id = ?', [req.user.id], (err, userInterests) => {
      if (err) userInterests = [];

      const courseCodes = userCourses.map(c => c.course_code);
      const interests = userInterests.map(i => i.interest);

      // Find suggested groups
      const suggestions = [];

      if (courseCodes.length > 0) {
        const placeholders = courseCodes.map(() => '?').join(',');
        
        db.all(
          `SELECT sg.*, u.name as creator_name,
          (SELECT COUNT(*) FROM group_members WHERE group_id = sg.id) as member_count
          FROM study_groups sg
          JOIN users u ON sg.creator_id = u.id
          WHERE sg.course_code IN (${placeholders}) 
          AND sg.is_active = 1
          AND sg.id NOT IN (SELECT group_id FROM group_members WHERE user_id = ?)`,
          [...courseCodes, req.user.id],
          (err, groups) => {
            if (!err && groups) {
              groups.forEach(group => {
                suggestions.push({
                  type: 'group',
                  target: group,
                  reason: `Study group for ${group.course_code}`,
                  score: 0.8
                });
              });
            }

            // Find suggested events based on interests
            db.all(
              `SELECT e.*, u.name as creator_name,
              (SELECT COUNT(*) FROM event_participants WHERE event_id = e.id) as participant_count
              FROM events e
              JOIN users u ON e.creator_id = u.id
              WHERE e.event_date >= datetime('now')
              AND e.id NOT IN (SELECT event_id FROM event_participants WHERE user_id = ?)
              ORDER BY e.event_date ASC
              LIMIT 10`,
              [req.user.id],
              (err, events) => {
                if (!err && events) {
                  events.forEach(event => {
                    const score = interests.some(i => event.title.toLowerCase().includes(i.toLowerCase()) || 
                                                       (event.description && event.description.toLowerCase().includes(i.toLowerCase()))) ? 0.9 : 0.5;
                    suggestions.push({
                      type: 'event',
                      target: event,
                      reason: 'Upcoming event that might interest you',
                      score
                    });
                  });
                }

                // Sort by score
                suggestions.sort((a, b) => b.score - a.score);
                res.json({ suggestions: suggestions.slice(0, 10) });
              }
            );
          }
        );
      } else {
        res.json({ suggestions: [] });
      }
    });
  });
});

// Convert suggestion to action
router.post('/suggestions/:suggestionId/convert', authenticateToken, (req, res) => {
  const db = getDb();

  db.run(
    'UPDATE suggestions SET is_converted = 1 WHERE id = ? AND user_id = ?',
    [req.params.suggestionId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error converting suggestion' });
      }

      res.json({ message: 'Suggestion converted successfully' });
    }
  );
});

module.exports = router;
