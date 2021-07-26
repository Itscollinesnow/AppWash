const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    numberplate: {
      type: String,
      trim: true,
    },
    colour: {
      type: String,
      trim: true,
    },
    make: {
        type: String,
        trim: true,
      },
    type: {
        type: String,
        trim: true,
    },
    time: {
        type: Number,
        trim: true,
    },
    doa: {
      type: Date,
    },
    datetimeArrival: {
        type: Date,
        trim: true,
        },
    package: {
        type: String,
        trim: true
    },
    washer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Washer',
    },
    packagePrice: {
      type: Number,
    },
    washerFee: {
      type: Number,
    },
  });

module.exports = mongoose.model('Car', carSchema);