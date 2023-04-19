const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomServiceSchema = new Schema({
  checkInID: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
});

const RoomService = mongoose.model('RoomService', roomServiceSchema);

module.exports = RoomService;
