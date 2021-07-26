const mongoose = require('mongoose');

const washerSchema = new mongoose.Schema({
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
        trim: true,
      },
    nin: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true
    }
  });

module.exports = mongoose.model('Washer', washerSchema);