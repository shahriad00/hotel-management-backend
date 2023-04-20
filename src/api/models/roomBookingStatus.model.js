const mongoose = require('mongoose');

const roomBookingStatusSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
});

const RoomBookingStatus = mongoose.model('RoomBookingStatus', roomBookingStatusSchema);

module.exports = RoomBookingStatus;
