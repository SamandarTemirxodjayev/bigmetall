/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Server is connecting on MongoDB');
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server is running on ${process.env.PROTOCOL}://${process.env.SERVER_IP}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

module.exports = app;
