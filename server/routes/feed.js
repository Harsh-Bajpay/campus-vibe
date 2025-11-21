const express = require('express');
const { getDb } = require('../models/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get personalized feed
router.get('/', authenticateToken, (req, res) => {
  const db = getDb();

  // Get user's courses and interests
  db.all('SELECT course_code FROM user_courses WHERE user_id = ?', [req.user.id], (err, userCourses) => {
    if (err) userCourses = [];

    db.all('SELECT interest FROM user_interests WHERE user_id = ?', [req.user.id], (err, userInterests) => {
      if (err) userInterests = [];

      const courseCodes = userCourses.map(c => c.course_code);
      const interests = userInterests.map(i => i.interest);

      const feedItems = [];

      // Get relevant events
      db.all(
        `SELECT e.*, u.name as creator_name, 'event' as type,
        (SELECT COUNT(*) FROM event_participants WHERE event_id = e.id) as participant_count,
        (SELECT status FROM event_participants WHERE event_id = e.id AND user_id = ?) as user_status
        FROM events e
        JOIN users u ON e.creator_id = u.id
        WHERE e.event_date >= datetime('now')
        ORDER BY e.event_date ASC
        LIMIT 10`,
        [req.user.id],
        (err, events) => {
          if (!err && events) {
            events.forEach(event => {
              const relevanceScore = interests.some(i => 
                event.title.toLowerCase().includes(i.toLowerCase()) || 
                (event.description && event.description.toLowerCase().includes(i.toLowerCase()))
              ) ? 1.0 : 0.5;

              feedItems.push({
                ...event,
                relevance_score: relevanceScore,
                feed_type: 'event'
              });
            });
          }

          // Get relevant study groups
          if (courseCodes.length > 0) {
            const placeholders = courseCodes.map(() => '?').join(',');
            db.all(
              `SELECT sg.*, u.name as creator_name, 'group' as type,
              (SELECT COUNT(*) FROM group_members WHERE group_id = sg.id) as member_count,
              (SELECT role FROM group_members WHERE group_id = sg.id AND user_id = ?) as user_role
              FROM study_groups sg
              JOIN users u ON sg.creator_id = u.id
              WHERE sg.is_active = 1 AND (sg.course_code IN (${placeholders}) OR sg.course_code IS NULL)
              ORDER BY sg.created_at DESC
              LIMIT 10`,
              [req.user.id, ...courseCodes],
              (err, groups) => {
                if (!err && groups) {
                  groups.forEach(group => {
                    const relevanceScore = courseCodes.includes(group.course_code) ? 1.0 : 0.3;
                    feedItems.push({
                      ...group,
                      relevance_score: relevanceScore,
                      feed_type: 'group'
                    });
                  });
                }

                // Get resources
                db.all(
                  `SELECT r.*, u.name as uploader_name, 'resource' as type
                  FROM resources r
                  JOIN users u ON r.uploader_id = u.id
                  ORDER BY r.created_at DESC
                  LIMIT 10`,
                  (err, resources) => {
                    if (!err && resources) {
                      resources.forEach(resource => {
                        const relevanceScore = courseCodes.includes(resource.course_code) ? 1.0 : 0.4;
                        feedItems.push({
                          ...resource,
                          relevance_score: relevanceScore,
                          feed_type: 'resource'
                        });
                      });
                    }

                    // Sort by relevance score and date
                    feedItems.sort((a, b) => {
                      if (Math.abs(a.relevance_score - b.relevance_score) > 0.1) {
                        return b.relevance_score - a.relevance_score;
                      }
                      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
                    });

                    res.json({ feed: feedItems.slice(0, 20) });
                  }
                );
              }
            );
          } else {
            // If no courses, just return events
            feedItems.sort((a, b) => b.relevance_score - a.relevance_score);
            res.json({ feed: feedItems.slice(0, 20) });
          }
        }
      );
    });
  });
});

module.exports = router;
