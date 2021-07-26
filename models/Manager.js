const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const managerSchema = new mongoose.Schema({
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
      required: true,
      unique: true,
    },
    dob: {
        type: Date,
        trim: true,
      },
    nin: {
        type: String,
        trim: true,
    },
    phonenumber: {
        type: Number,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true
    },
    password: {
      type: String,
    }
  });
managerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Manager', managerSchema);