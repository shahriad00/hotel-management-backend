const mongoose = require('mongoose');

const roomBookingStatusSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  checkInId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckIn',
    required: true,
  },
  roomName: {
    type: String,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    default: 'check-in',
  },
});

const RoomBookingStatus = mongoose.model('RoomBookingStatus', roomBookingStatusSchema);

module.exports = RoomBookingStatus;
