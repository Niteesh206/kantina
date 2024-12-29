const express = require('express');
const passport = require('passport');
const Order = require('../models/Order');

const router = express.Router();

// Create a new order
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newOrder = new Order({
    slotId: req.body.slotId,
    userId: req.user.id,
    status: 'Pending'
  });

  newOrder.save()
    .then(order => res.json(order))
    .catch(error => res.status(500).json({ message: 'Error saving order', error }));
});

// Get all orders for a slot with populated slot details
router.get('/slot/:slotId', (req, res) => {
  Order.find({ slotId: req.params.slotId })
    .populate('slotId', 'title time') // Populate the slotId with only the title and time fields
    .then(orders => res.json(orders))
    .catch(error => {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    });
});

// Update order status
router.put('/:orderId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Order.findById(req.params.orderId)
    .then(order => {
      if (order) {
        order.status = req.body.status;
        order.save()
          .then(updatedOrder => res.json(updatedOrder))
          .catch(error => res.status(500).json({ message: 'Error updating order', error }));
      } else {
        res.status(404).json({ ordernotfound: 'Order not found' });
      }
    })
    .catch(error => res.status(500).json({ message: 'Error fetching order', error }));
});

module.exports = router;
