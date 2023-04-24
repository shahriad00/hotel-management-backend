const moment = require('moment');
const CheckIn = require('../models/checkIn.model');
const Room = require('../models/room.model');
const AdvancePayment = require('../models/advance.model');
const RoomBookingStatus = require('../models/roomBookingStatus.model');

// room status updated when checked-In

const updateRoom = async (roomId) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    { _id: roomId },
    {
      status: 'booked',
    },
  );
  await updatedRoom.save();
};

const addRoomBookingStatus = async (room) => {
  await RoomBookingStatus.create({
    roomId: room.roomId,
    roomName: room.roomName,
    from: room.checkIn,
    to: room.checkOut,
  });
};

// ------------------- add Check In --------------------------

const addCheckIn = async (req, res, next) => {
  try {
    const checkInDate = req.body.checkIn;
    const checkOutDate = req.body.checkOut;
    const newSelectRooms = req.body.selectRooms;
    const newOtherPerson = req.body.otherPerson;
    const newAdvancePayment = req.body.advancePayment;

    const otherPerson = JSON.parse(newOtherPerson);
    const advancePayment = JSON.parse(newAdvancePayment);
    const selectRooms = JSON.parse(newSelectRooms);
    // eslint-disable-next-line array-callback-return
    selectRooms.map((room) => {
      updateRoom(room.roomId);
      addRoomBookingStatus(room);
    });

    // calculate the duration between the two dates
    const start = moment(checkInDate);
    const end = moment(checkOutDate);
    const duration = moment.duration(end.diff(start));
    const durationOfStay = duration.asDays();

    const version = '/v1';
    const images = req.files.map((file) => version + file.path.replace('public', ''));
    const checkIn = await CheckIn.create({
      ...req.body,
      images,
      selectRooms,
      otherPerson,
      durationOfStay,
    });
    res.status(200).send({
      message: 'Check In completed successfully',
      checkIn,
    });
    const advancePaymentAmount = await AdvancePayment.create({
      checkInID: checkIn._id,
      paymentType: advancePayment.paymentType,
      amount: advancePayment.amount,
    });
    res.status(200).send({
      message: 'Check In completed successfully',
      advancePaymentAmount,
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

const addAdvanceAmount = async (req, res, next) => {
  try {
    const { checkInID } = req.body;
    await AdvancePayment.create({ ...req.body });

    const advanceAmount = await AdvancePayment.find({ checkInID });

    let totalAmount = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < advanceAmount.length; i++) {
      totalAmount += parseFloat(advanceAmount[i].amount);
    }
    res.status(200).send({ totalAmount });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCheckIn,
  getSingleCheckIn,
  getAllCheckIns,
  addAdvanceAmount,
};
