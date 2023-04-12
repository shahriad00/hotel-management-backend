const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  selectRoom: [{ type: String, required: true }],
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  guestIdType: { type: String, required: true },
  guestIdNo: { type: String, required: true },
  companyName: { type: String },
  otherPersonName: [String],
  otherPersonIdType: [String],
  otherPersonIdNo: [String],
  bookedBy: { type: String },
  referencedBy: { type: String },
  reasonOfStay: { type: String },
  images: [String],
  paymentType: { type: String },
  advancePayment: { type: Number },
  amountFixed: { type: Number },
  date: { type: Date, default: new Date() },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
