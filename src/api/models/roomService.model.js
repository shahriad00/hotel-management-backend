const mongoose = require('mongoose');
const moment = require('moment/moment');

const { Schema } = mongoose;

const roomServiceSchema = new Schema({
  checkInID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckIn',
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
    type: Date,
    default: moment(new Date()).format('YYYY-MM-DD'),
  },
});

const RoomService = mongoose.model('RoomService', roomServiceSchema);

module.exports = RoomService;
