const RoomType = require('../models/roomType.model');
const Room = require('../models/room.model');

// ------------------- add roomType --------------------------
const addRoomType = async (req, res, next) => {
  try {
    const {
      title,
      capacity,
      basePrice,
      discountPrice,
      status,
      amenityList,
    } = req.body;
    await RoomType.create({
      title,
      capacity,
      basePrice,
      discountPrice,
      status,
      amenityList,
    });
    res.status(200).send({
      message: 'Room type added successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ------------------ add room ------------------------------
const addRoom = async (req, res, next) => {
  try {
    const host = 'http://localhost:4000';
    const images = req.files.map((file) => host + file.path.replace('public', ''));
    const room = await Room.create({ ...req.body, images });
    res.status(200).json({
      message: 'Room added successfully',
      room
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRoom,
  addRoomType,
};
