const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../models/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create event
router.post('/', authenticateToken, (req, res) => {
  const { title, description, event_date, location, category, max_participants } = req.body;

  if (!title || !event_date) {
    return res.status(400).json({ error: 'Title and event date are required' });
  }

  const eventId = uuidv4();
  const db = getDb();

  db.run(
    'INSERT INTO events (id, title, description, creator_id, event_date, location, category, max_participants) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [eventId, title, description, req.user.id, event_date, location, category, max_participants],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating event' });
      }

      res.status(201).json({
        message: 'Event created successfully',
        event: {
          id: eventId,
          title,
          description,
          creator_id: req.user.id,
          event_date,
          location,
          category,
          max_participants
        }
      });
    }
  );
});

// Get all events
router.get('/', authenticateToken, (req, res) => {
  const { category, upcoming } = req.query;
  const db = getDb();

  let query = `
    SELECT e.*, u.name as creator_name,
    (SELECT COUNT(*) FROM event_participants WHERE event_id = e.id) as participant_count
    FROM events e
    JOIN users u ON e.creator_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    query += ' AND e.category = ?';
    params.push(category);
  }

  if (upcoming === 'true') {
    query += ' AND e.event_date >= datetime("now")';
  }

  query += ' ORDER BY e.event_date ASC';

  db.all(query, params, (err, events) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching events' });
    }

    res.json({ events });
  });
});

// Get event by ID
router.get('/:eventId', authenticateToken, (req, res) => {
  const db = getDb();

  db.get(
    `SELECT e.*, u.name as creator_name,
    (SELECT COUNT(*) FROM event_participants WHERE event_id = e.id) as participant_count
    FROM events e
    JOIN users u ON e.creator_id = u.id
    WHERE e.id = ?`,
    [req.params.eventId],
    (err, event) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Get participants
      db.all(
        `SELECT u.id, u.name, ep.status, ep.joined_at
        FROM event_participants ep
        JOIN users u ON ep.user_id = u.id
        WHERE ep.event_id = ?`,
        [req.params.eventId],
        (err, participants) => {
          if (err) participants = [];

          res.json({
            ...event,
            participants
          });
        }
      );
    }
  );
});

// Join/Mark interest in event
router.post('/:eventId/join', authenticateToken, (req, res) => {
  const { status } = req.body; // 'interested' or 'joined'
  const db = getDb();

  db.run(
    'INSERT OR REPLACE INTO event_participants (event_id, user_id, status) VALUES (?, ?, ?)',
    [req.params.eventId, req.user.id, status || 'interested'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error joining event' });
      }

      res.json({ message: 'Successfully joined event' });
    }
  );
});

// Leave event
router.delete('/:eventId/leave', authenticateToken, (req, res) => {
  const db = getDb();

  db.run(
    'DELETE FROM event_participants WHERE event_id = ? AND user_id = ?',
    [req.params.eventId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error leaving event' });
      }

      res.json({ message: 'Successfully left event' });
    }
  );
});

module.exports = router;
