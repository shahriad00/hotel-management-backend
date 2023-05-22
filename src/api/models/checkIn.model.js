const moment = require('moment/moment');
const mongoose = require('mongoose');

const types = ['booking', 'check-in', 'check-out'];

function getRandonString(length) {
  const chars = 'ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ';
  const charLength = chars.length;
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

const uniqueId = getRandonString(8);

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
  address: { type: String, required: true },
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
  date: { type: Date, default: moment(new Date()).format('YYYY-MM-DD') },
  type: { type: String, enum: types, default: 'check-in' },
  pickup: { type: String },
  pickupCharge: { type: Number },
  specialInstruction: { type: String },
  discount: { type: Number, default: 0 },
  bookingId: { type: String, default: uniqueId },
  grandTotal: { type: Number, default: 0 },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
