const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pet = mongoose.model('pet', PetSchema);
