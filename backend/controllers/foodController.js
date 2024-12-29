const Food = require('../models/Food');

// Get all food items
const getFoodItems = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items' });
  }
};

// Add a new food item
const addFoodItem = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newFood = new Food({ name, price });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: 'Error adding food item' });
  }
};

module.exports = { getFoodItems, addFoodItem };
