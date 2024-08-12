const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM banner WHERE id=1', (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});


router.post('/', (req, res) => {
  const { text, link, timer, visible } = req.body;
  const sql = `UPDATE banner SET text=?, link=?, timer=?, visible=? WHERE id=1`;
  db.query(sql, [text, link, timer, visible], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Banner updated successfully' });
  });
});

module.exports = router;
