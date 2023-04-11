const RoomType = require('../models/roomType.model');
const Room = require('../models/room.model');

// ------------------- add roomType --------------------------
const addRoomType = async (req, res, next) => {
  try {
    const roomType = await RoomType.create({ ...req.body });
    res.status(200).send({
      message: 'Room type added successfully',
      roomType,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------ add room ------------------------------
const addRoom = async (req, res, next) => {
  try {
    const version = '/v1';
    const images = req.files.map((file) => version + file.path.replace('public', ''));
    const room = await Room.create({ ...req.body, images });
    res.status(200).json({
      message: 'Room added successfully',
      room,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRoom,
  addRoomType,
};
