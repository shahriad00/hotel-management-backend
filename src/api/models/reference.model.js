const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
});

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;
