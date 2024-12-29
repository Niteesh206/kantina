const Slot = require('../models/Slot');
const Order = require('../models/Order');

// Fetch all slots
exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching slots' });
  }
};

// Add or update slot capacity
exports.addOrUpdateSlot = async (req, res) => {
  const { slot, capacity } = req.body;

  try {
    let existingSlot = await Slot.findOne({ slot });
    if (existingSlot) {
      existingSlot.capacity = capacity;
      await existingSlot.save();
      res.json(existingSlot);
    } else {
      const newSlot = new Slot({ slot, capacity });
      await newSlot.save();
      res.json(newSlot);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding or updating slot' });
  }
};