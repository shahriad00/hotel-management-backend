const mongoose = require('mongoose');

const { Schema } = mongoose;

const totalExpenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const TotalExpense = mongoose.model('TotalExpense', totalExpenseSchema);

module.exports = TotalExpense;
