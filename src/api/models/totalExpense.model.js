const mongoose = require('mongoose');
const moment = require('moment/moment');

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
    default: moment(new Date()).format('YYYY-MM-DD'),
  },
});

const TotalExpense = mongoose.model('TotalExpense', totalExpenseSchema);

module.exports = TotalExpense;
