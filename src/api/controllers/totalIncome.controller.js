/* eslint-disable object-curly-newline */
const moment = require('moment');
const CheckIn = require('../models/checkIn.model');

const totalIncome = async (req, res, next) => {
  const { page = 1, limit = 20, from = '', to = '' } = req.query;
  let allIncome;
  let count;
  try {
    if (from === '' && to === '') {
      allIncome = await CheckIn.find({
        isCheckedOut: true,
      })
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      count = await CheckIn.find({
        isCheckedOut: true,
      }).countDocuments();
    } else {
      const fromDate = moment(from).format('YYYY-MM-DD');
      const toDate = moment(to).format('YYYY-MM-DD');
      allIncome = await CheckIn.find({
        isCheckedOut: true,
        checkOut: {
          $lte: toDate,
          $gte: fromDate,
        },
      })
        .sort({ _id: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      count = await CheckIn.find({
        isCheckedOut: true,
        checkOut: {
          $lte: toDate,
          $gte: fromDate,
        },
      }).countDocuments();
    }

    res.send({
      allIncome,
      totalPages: Math.ceil(Number(count) / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
    console.error(err.message);
  }
};

module.exports = {
  totalIncome,
};
