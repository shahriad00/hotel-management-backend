const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
  },
  roomTypeName: {
    type: String,
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
  roomDetails: {
    type: String,
  },
  images: [String],
  isPublished: {
    type: Boolean,
    default: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
