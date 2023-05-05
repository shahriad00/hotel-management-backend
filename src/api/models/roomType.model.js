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
    type: Number,
    required: true,
    trim: true,
  },
  discountPrice: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  amenityList: {
    type: [String],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomType;
