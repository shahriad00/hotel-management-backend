const CheckIn = require('../models/checkIn.model');

// ------------------- add Check In --------------------------
const addCheckIn = async (req, res, next) => {
  try {
    const version = '/v1';
    const images = req.files.map((file) => version + file.path.replace('public', ''));
    const checkIn = await CheckIn.create({ ...req.body, images });
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
