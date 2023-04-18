const mongoose = require('mongoose');

const advancePaymentSchema = new mongoose.Schema({
  checkInID: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  paymentDate: {
    type: Date,
    default: new Date(),
  },
  amount: {
    type: Number,
  },
});

const AdvancePayment = mongoose.model('AdvancePayment', advancePaymentSchema);

module.exports = AdvancePayment;
