const CheckIn = require('../models/checkIn.model');
const Room = require('../models/room.model');

const updateRoom = async (roomId) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    { _id: roomId },
    {
      status: 'booked',
    },
  );
  updatedRoom.save();
};

// ------------------- add Check In --------------------------

const addCheckIn = async (req, res, next) => {
  try {
    console.log(req.body);
    const newSelectRooms = req.body.selectRooms;
    const newOtherPerson = req.body.otherPerson;
    const selectRooms = JSON.parse(newSelectRooms);
    // eslint-disable-next-line array-callback-return
    selectRooms.map((room) => {
      updateRoom(room.roomId);
    });
    const otherPerson = JSON.parse(newOtherPerson);
    const version = '/v1';
    const images = req.files.map((file) => version + file.path.replace('public', ''));
    const checkIn = await CheckIn.create({
      ...req.body,
      images,
      selectRooms,
      otherPerson,
    });
    res.status(200).send({
      message: 'Check In completed successfully',
      checkIn,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------- get single Check In --------------------------
const getSingleCheckIn = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const singleCheckIn = await CheckIn.findOne({ _id });
    res.status(200).send(singleCheckIn);
  } catch (error) {
    next(error);
  }
};

// ------------ get All Check In's -----------------------
const getAllCheckIns = async (req, res, next) => {
  try {
    CheckIn.find({})
      .sort({ _id: -1 })
      .exec((err, checkInList) => {
        const allCheckIns = checkInList.map((checkIn) => checkIn);
        res.status(200).send(allCheckIns);
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCheckIn,
  getSingleCheckIn,
  getAllCheckIns,
};
