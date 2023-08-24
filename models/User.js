const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  reflections: [
    {
      type: String,
      default: []
    }
  ],
  quizResults: [
    {
      type: Array,
      default: [],
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
