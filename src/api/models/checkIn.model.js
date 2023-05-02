const mongoose = require('mongoose');

const types = ['booking', 'check-in', 'check-out'];

const otherPersonSchema = new mongoose.Schema({
  name: { type: String },
  idType: { type: String },
  idNumber: { type: String },
});

const roomSelectionSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  roomPrice: { type: String },
  roomName: { type: String, required: true },
});

const checkInSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  selectRooms: [roomSelectionSchema],
  name: { type: String, required: true },
  email: { type: String, required: false, unique: false },
  mobile: { type: String, required: true },
  address: { type: String },
  country: { type: String },
  guestIdType: { type: String },
  guestIdNo: { type: String },
  companyName: { type: String },
  otherPerson: [otherPersonSchema],
  bookedBy: { type: String },
  referencedById: { type: String },
  referencedByName: { type: String },
  reasonOfStay: { type: String },
  images: [String],
  paymentType: { type: String },
  totalAdvance: { type: Number },
  amountFixed: { type: Number },
  durationOfStay: { type: Number },
  isCheckedOut: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
  type: { type: String, enum: types, default: 'check-in' },
  pickup: { type: String },
  pickupCharge: { type: Number },
  specialInstruction: { type: String },
  bookingId: { type: String, default: Date.now().toString() },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
