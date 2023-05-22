/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
const moment = require('moment');
const CheckIn = require('../models/checkIn.model');

const totalIncome = async (req, res, next) => {
  const { page = 1, limit = 30, from = '', to = '' } = req.query;
  let grandTotal = 0;
  try {
    const fromDate = moment(from).startOf('day');
    const toDate = moment(to).endOf('day');

    const allIncome = await CheckIn.find({
      isCheckedOut: true,
      checkOut: {
        $gte: fromDate.toDate(),
        $lte: toDate.toDate(),
      },
    })
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CheckIn.find({
      isCheckedOut: true,
      checkOut: {
        $gte: fromDate.toDate(),
        $lte: toDate.toDate(),
      },
    }).countDocuments();

    if (allIncome.length > 0) {
      for (let i = 0; i < allIncome.length; i++) {
        grandTotal += allIncome[i].grandTotal;
      }
    }

    res.send({
      allIncome,
      totalPages: Math.ceil(Number(count) / limit),
      currentPage: page,
      grandTotal,
    });
  } catch (err) {
    next(err);
    console.error(err.message);
  }
};

module.exports = {
  totalIncome,
};
