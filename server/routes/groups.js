const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../models/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create study group
router.post('/', authenticateToken, (req, res) => {
  const { name, description, course_code, max_members } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Group name is required' });
  }

  const groupId = uuidv4();
  const db = getDb();

  db.run(
    'INSERT INTO study_groups (id, name, description, course_code, creator_id, max_members) VALUES (?, ?, ?, ?, ?, ?)',
    [groupId, name, description, course_code, req.user.id, max_members],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating group' });
      }

      // Automatically add creator as admin
      db.run(
        'INSERT INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)',
        [groupId, req.user.id, 'admin'],
        (err) => {
          res.status(201).json({
            message: 'Study group created successfully',
            group: {
              id: groupId,
              name,
              description,
              course_code,
              creator_id: req.user.id,
              max_members
            }
          });
        }
      );
    }
  );
});

// Get all study groups
router.get('/', authenticateToken, (req, res) => {
  const { course_code } = req.query;
  const db = getDb();

  let query = `
    SELECT sg.*, u.name as creator_name,
    (SELECT COUNT(*) FROM group_members WHERE group_id = sg.id) as member_count
    FROM study_groups sg
    JOIN users u ON sg.creator_id = u.id
    WHERE sg.is_active = 1
  `;
  const params = [];

  if (course_code) {
    query += ' AND sg.course_code = ?';
    params.push(course_code);
  }

  query += ' ORDER BY sg.created_at DESC';

  db.all(query, params, (err, groups) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching groups' });
    }

    res.json({ groups });
  });
});

// Get group by ID
router.get('/:groupId', authenticateToken, (req, res) => {
  const db = getDb();

  db.get(
    `SELECT sg.*, u.name as creator_name,
    (SELECT COUNT(*) FROM group_members WHERE group_id = sg.id) as member_count
    FROM study_groups sg
    JOIN users u ON sg.creator_id = u.id
    WHERE sg.id = ?`,
    [req.params.groupId],
    (err, group) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }

      // Get members
      db.all(
        `SELECT u.id, u.name, u.major, gm.role, gm.joined_at
        FROM group_members gm
        JOIN users u ON gm.user_id = u.id
        WHERE gm.group_id = ?`,
        [req.params.groupId],
        (err, members) => {
          if (err) members = [];

          res.json({
            ...group,
            members
          });
        }
      );
    }
  );
});

// Join study group
router.post('/:groupId/join', authenticateToken, (req, res) => {
  const db = getDb();

  // Check if group is full
  db.get(
    `SELECT sg.max_members, COUNT(gm.user_id) as current_members
    FROM study_groups sg
    LEFT JOIN group_members gm ON sg.id = gm.group_id
    WHERE sg.id = ?
    GROUP BY sg.id`,
    [req.params.groupId],
    (err, groupInfo) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!groupInfo) {
        return res.status(404).json({ error: 'Group not found' });
      }

      if (groupInfo.max_members && groupInfo.current_members >= groupInfo.max_members) {
        return res.status(400).json({ error: 'Group is full' });
      }

      db.run(
        'INSERT INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)',
        [req.params.groupId, req.user.id, 'member'],
        function(err) {
          if (err) {
            if (err.message.includes('UNIQUE')) {
              return res.status(409).json({ error: 'Already a member of this group' });
            }
            return res.status(500).json({ error: 'Error joining group' });
          }

          res.json({ message: 'Successfully joined group' });
        }
      );
    }
  );
});

// Leave study group
router.delete('/:groupId/leave', authenticateToken, (req, res) => {
  const db = getDb();

  db.run(
    'DELETE FROM group_members WHERE group_id = ? AND user_id = ?',
    [req.params.groupId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error leaving group' });
      }

      res.json({ message: 'Successfully left group' });
    }
  );
});

module.exports = router;
