const mongoose = require('mongoose');
const moment = require('moment/moment');

const advancePaymentSchema = new mongoose.Schema({
  checkInID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckIn',
    required: true,
  },
  paymentType: {
    type: String,
  },
  paymentDate: {
    type: Date,
    default: moment(new Date()).format('YYYY-MM-DD'),
  },
  amount: {
    type: Number,
    require: true,
  },
});

const AdvancePayment = mongoose.model('AdvancePayment', advancePaymentSchema);

module.exports = AdvancePayment;
