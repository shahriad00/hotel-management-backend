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

// ------------ get single Room Types -----------------------
const getSingleRoomType = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const singleRoomType = await RoomType.findOne({ _id });
    res.status(200).send(singleRoomType);
  } catch (err) {
    next(err);
  }
};

// ------------ get All Room Types -----------------------
const getAllRoomTypes = async (req, res, next) => {
  try {
    RoomType.find({})
      .sort({ _id: -1 })
      .exec((err, roomTypesList) => {
        const allRoomTypes = roomTypesList.map((roomType) => roomType);
        res.status(200).send(allRoomTypes);
      });
  } catch (err) {
    next(err);
  }
};

// ------------------- update roomType --------------------------
const updateRoomType = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const {
      title, capacity, basePrice, discountPrice, status, amenityList,
    } = req.body;
    const updatedRoomType = await RoomType.findByIdAndUpdate(
      { _id },
      {
        title, capacity, basePrice, discountPrice, status, amenityList,
      },
    );
    await updatedRoomType.save();
    res.send({
      message: 'Room Type updated successfully',
      updatedRoomType,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------ Room -------------------------------------------------

// -------------- add room ------------------
const addRoom = async (req, res, next) => {
  try {
    const version = '/v1';
    const images = req.files && req.files.map((file) => version + file.path.replace('public', ''));
    const room = await Room.create({ ...req.body, images });
    res.status(200).json({
      message: 'Room added successfully',
      room,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- update room --------------------------
const updateRoom = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const {
      roomTypeId, name, floorNo, status, details, images,
    } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      { _id },
      {
        roomTypeId, name, floorNo, status, details, images,
      },
    );
    await updatedRoom.save();
    res.send({
      message: 'Room updated successfully',
      updatedRoom,
    });
  } catch (error) {
    next(error);
  }
};

// ------------ get single Room -----------------------
const getSingleRoom = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const singleRoom = await Room.findOne({ _id });
    res.status(200).send(singleRoom);
  } catch (err) {
    next(err);
  }
};

// ------------ get All Room -----------------------
const getAllRoom = async (req, res, next) => {
  try {
    Room.find({})
      .sort({ _id: -1 })
      .exec((err, roomList) => {
        const allRooms = roomList.map((room) => room);
        res.status(200).send(allRooms);
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addRoom,
  getAllRoom,
  updateRoom,
  getSingleRoom,
  addRoomType,
  updateRoomType,
  getAllRoomTypes,
  getSingleRoomType,
};
