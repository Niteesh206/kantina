const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/users');
const slots = require('./routes/slots');
const orders = require('./routes/orders');
const adminRoutes = require('./routes/adminRoutes');
const foodRoutes = require('./routes/foodRoutes');
const { mongoURI } = require('./config');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());
app.use(cors({ origin: '*' }));

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use admin routes
app.use('/api/admin', adminRoutes);

// Routes
app.use('/api/users', users);
app.use('/api/slots', slots);
app.use('/api/orders', orders);
app.use('/api/food', foodRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));