const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Fetch all slots
router.get('/slots', adminController.getAllSlots);

// Add or update slot capacity
router.post('/slots', adminController.addOrUpdateSlot);

module.exports = router;