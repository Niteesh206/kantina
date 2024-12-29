// filepath: /backend/routes/slots.js
const express = require('express');
const passport = require('passport');
const Slot = require('../models/Slot');

const router = express.Router();

// Create a new slot
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newSlot = new Slot({
    title: req.body.title,
    time: req.body.time
  });

  newSlot.save().then(slot => res.json(slot));
});

// Get all slots
router.get('/', (req, res) => {
  Slot.find().then(slots => res.json(slots));
});

module.exports = router;