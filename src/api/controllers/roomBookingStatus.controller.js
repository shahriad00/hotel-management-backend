const RoomBookingStatus = require('../models/roomBookingStatus.model');

const getAllRoomBookingStatus = async (req, res, next) => {
  try {
    RoomBookingStatus.find({})
      .sort({ _id: -1 })
      .exec((err, roomStatus) => {
        const allRoomBookingStatus = roomStatus.map((room) => room);
        res.status(200).send(allRoomBookingStatus);
      });
  } catch (err) {
    next(err);
  }
};

module.export = {
  getAllRoomBookingStatus,
};
