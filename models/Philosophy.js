const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhilosophySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  origin: {
    type: String,
    required: true
  },
  keyPrinciples: {
    type: [String],
    required: true
  },
  notablePhilosophers: {
    type: [String]
  },
  culturalContext: {
    type: String
  },
  associatedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Philosophy', PhilosophySchema);
