const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  capacity: {
    type: String,
    required: true,
    trim: true,
  },
  basePrice: {
    type: String,
    required: true,
    trim: true,
  },
  discountPrice: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  amenityList: {
    type: [String],
  },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomType;
