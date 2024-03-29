/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
const moment = require('moment/moment');
const fs = require('fs');
const path = require('path');
const RoomType = require('../models/roomType.model');
const Room = require('../models/room.model');
const RoomBookingStatus = require('../models/roomBookingStatus.model');

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
    const allRoomTypes = await RoomType.find({ isPublished: true }).sort({
      _id: -1,
    });
    res.status(200).send(allRoomTypes);
  } catch (err) {
    next(err);
  }
};

// ------------------- update roomType --------------------------
const updateRoomType = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { title, capacity, basePrice, discountPrice, status, amenityList } = req.body;
    const updatedRoomType = await RoomType.findByIdAndUpdate(
      { _id },
      {
        title,
        capacity,
        basePrice,
        discountPrice,
        status,
        amenityList,
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

const unpublishRoomType = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { isPublished } = req.body;
    const unpublishedRoomType = await RoomType.findByIdAndUpdate(
      { _id },
      {
        isPublished,
      },
    );
    await unpublishedRoomType.save();
    res.send({
      message: 'Room Type deleted successfully!',
      unpublishedRoomType,
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
      roomTypeId,
      name,
      floorNo,
      status,
      roomDetails,
      removedImages = [],
      existingImg = [],
    } = req.body;
    if (removedImages.length > 0) {
      removedImages.map((imgPath) => {
        const newPath = imgPath.replace('/v1', '');
        const dirPath = path.join(__dirname, `/public${newPath}`);
        const newDirName = dirPath.replace('\\src\\api\\controllers', '');
        fs.unlink(newDirName, (err) => {
          if (err) return console.log(err);
          console.log('file deleted successfully');
        });
      });
    }
    const version = '/v1';
    const newImages = (req.files && req.files.map((file) => version + file.path.replace('public', ''))) || [];
    const finalImage = [...existingImg, ...newImages];
    const updatedRoom = await Room.findByIdAndUpdate(
      { _id },
      {
        roomTypeId,
        name,
        floorNo,
        status,
        roomDetails,
        images: finalImage,
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
    const allRooms = await Room.find({ isPublished: true }).sort({ _id: -1 });
    res.status(200).send(allRooms);
  } catch (err) {
    next(err);
  }
};

// ------------ get available room by search ---------------

const getAvailableRooms = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const fromDate = moment(from).startOf('day');
    const toDate = moment(to).endOf('day');

    // Searching for date that falls within the date range
    const selectedRooms = await RoomBookingStatus.find({
      from: {
        $lte: toDate.toDate(),
      },
      to: {
        $gte: fromDate.toDate(),
      },
    });

    const allRooms = await Room.find({ isPublished: true }).sort({ _id: -1 });

    res.status(200).send({ allRooms, selectedRooms });
  } catch (error) {
    next(error);
  }
};

// get all rooms status for calender

const getAllRoomStatus = async (req, res, next) => {
  try {
    const allRoomStatus = await RoomBookingStatus.find().sort({ _id: -1 });
    res.status(200).send(allRoomStatus);
  } catch (err) {
    next(err);
  }
};

const unpublishRoom = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { isPublished } = req.body;
    const unpublishedRoom = await Room.findByIdAndUpdate(
      { _id },
      {
        isPublished,
      },
    );
    await unpublishedRoom.save();
    res.send({
      message: 'Room deleted successfully!',
      unpublishedRoom,
    });
  } catch (error) {
    next(error);
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
  getAvailableRooms,
  getAllRoomStatus,
  unpublishRoomType,
  unpublishRoom,
};
