const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  floorNo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  images: [String],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
