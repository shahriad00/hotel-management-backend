const mongoose = require('mongoose');

const otherPersonSchema = new mongoose.Schema({
  name: { type: String },
  IdType: { type: String },
  IdNo: { type: String },
});

const roomSelectionSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  roomPrice: { type: String },
  roomName: { type: String, required: true },
});

const checkInSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  selectRoom: [roomSelectionSchema],
  name: { type: String, required: true },
  email:
    {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      // eslint-disable-next-line no-useless-escape
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  guestIdType: { type: String, required: true },
  guestIdNo: { type: String, required: true },
  companyName: { type: String },
  otherPerson: [otherPersonSchema],
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
