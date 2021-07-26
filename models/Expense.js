const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    item: {
      type: String,
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
    },
    doe: {
      type: Date,
      trim: true,
    },
  });

module.exports = mongoose.model('Expense', expenseSchema);