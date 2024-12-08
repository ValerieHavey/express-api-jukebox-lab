const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require ('method-override');

const trackRouter = require('./controllers/tracks.js');

app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(methodOverride());
app.use(express.json());

// Routes go here
app.use('/tracks', trackRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
