const express = require('express');
const { getFoodItems, addFoodItem } = require('../controllers/foodController');
const router = express.Router();

// GET request to fetch all food items
router.get('/', getFoodItems);

// POST request to add a new food item
router.post('/', addFoodItem);

module.exports = router;
