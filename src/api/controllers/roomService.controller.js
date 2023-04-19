const RoomService = require('../models/roomService.model');

// ------------------- add room service --------------------------
const addRoomService = async (req, res, next) => {
  try {
    const roomService = await RoomService.create({ ...req.body });
    res.status(200).send({
      message: 'Room service added successfully',
      roomService,
    });
  } catch (error) {
    next(error);
  }
};

// ------------ get Room services by check-in Id-----------------------
const getRoomServices = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const roomServices = await RoomService.findOne({ checkInID: _id });
    res.status(200).send(roomServices);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addRoomService,
  getRoomServices,
};
