/* eslint-disable array-callback-return */
const moment = require('moment');
const CheckIn = require('../models/checkIn.model');
const AdvancePayment = require('../models/advance.model');
const RoomBookingStatus = require('../models/roomBookingStatus.model');

// room status updated when checked-In

const addRoomBookingStatus = async (room, type, checkInId) => {
  await RoomBookingStatus.create({
    roomId: room.roomId,
    roomName: room.roomName,
    from: room.checkIn,
    to: room.checkOut,
    type,
    checkInId,
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
      durationOfStay: durationOfStay < 1 ? 1 : durationOfStay,
    });

    selectRooms.map((room) => {
      addRoomBookingStatus(room, req.body.type, checkIn._id);
    });

    if (advancePayment.paymentType !== '' || advancePayment.amount !== '') {
      await AdvancePayment.create({
        checkInID: checkIn._id,
        paymentType: advancePayment.paymentType,
        amount: advancePayment.amount,
      });
    }
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

// ------------ get Advance Amount -----------------------

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

// ------------ moving booking to check-in -----------------------

const updateBookingToCheckIn = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { type } = req.body;
    const updateBooking = await CheckIn.findByIdAndUpdate(
      { _id },
      { type },
    );
    updateBooking.save();
    res.status(200).send({ message: 'Booking Successfully moved to Check In' });
  } catch (err) {
    next(err);
  }
};

// ------------------- checkout -------------------------------

const updateToCheckOut = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { type, discount, grandTotal } = req.body;
    const checkOut = await CheckIn.findByIdAndUpdate(
      { _id },
      {
        isCheckedOut: true,
        type,
        discount,
        grandTotal,
      },
    );
    checkOut.save();
    res.status(200).send({ message: 'Successfully Checked out!' });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// -------------- check-in pagination -----------------

const checkInPagination = async (req, res, next) => {
  const { page = 1, limit = 20, search = '' } = req.query;

  try {
    const allCheckIns = await CheckIn.find({
      type: 'check-in',
      isCheckedOut: false,
      $or: [
        {
          name: { $regex: search.toString(), $options: 'i' },
        },
        {
          mobile: { $regex: search.toString(), $options: 'i' },
        },
        {
          bookingId: { $regex: search.toString(), $options: 'i' },
        },
      ],
    })
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CheckIn.find({
      type: 'check-in',
      isCheckedOut: false,
    }).countDocuments();

    res.send({
      allCheckIns,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
    console.error(err.message);
  }
};

const checkOutPagination = async (req, res, next) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  try {
    const allCheckOuts = await CheckIn.find({
      type: 'check-out',
      isCheckedOut: true,
      $or: [
        {
          name: { $regex: search.toString(), $options: 'i' },
        },
        {
          mobile: { $regex: search.toString(), $options: 'i' },
        },
        {
          bookingId: { $regex: search.toString(), $options: 'i' },
        },
      ],
    })
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CheckIn.find({
      type: 'check-out',
      isCheckedOut: true,
    }).countDocuments();

    res.send({
      allCheckOuts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
    console.error(err.message);
  }
};

const bookingPagination = async (req, res, next) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  try {
    const allBookings = await CheckIn.find({
      type: 'booking',
      isCheckedOut: false,
      $or: [
        {
          name: { $regex: search.toString(), $options: 'i' },
        },
        {
          mobile: { $regex: search.toString(), $options: 'i' },
        },
        {
          bookingId: { $regex: search.toString(), $options: 'i' },
        },
      ],
    })
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CheckIn.find({
      type: 'booking',
      isCheckedOut: false,
    }).countDocuments();

    res.send({
      allBookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
    console.error(err.message);
  }
};

const deleteBooking = async(req, res, next) => {
  try {
    const _id = req.params.id;
    const deletedBooking = await CheckIn.findByIdAndDelete({ _id });
    res.send({
      deletedBooking,
      message: 'Booking deleted successfully!',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCheckIn,
  getSingleCheckIn,
  getAllCheckIns,
  addAdvanceAmount,
  updateToCheckOut,
  checkInPagination,
  updateBookingToCheckIn,
  checkOutPagination,
  bookingPagination,
  deleteBooking,
};
