require('dotenv').config();
const mongoose = require ('mongoose');

const mongooseOptions = {dbName: 'quiz_ai'};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then (() => console.log('MongoDB connected!'))
  .catch ((error) => console.log(error))