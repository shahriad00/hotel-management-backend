const moment = require('moment/moment');
const TotalExpense = require('../models/totalExpense.model');
const CheckIn = require('../models/checkIn.model');

// ------------ get All report-----------------------
const getTotalReport = async (req, res, next) => {
  const { page = 1, limit = 30, from = '', to = '' } = req.query;
  let grandTotalExpense = 0;
  let grandTotalIncome = 0;
  try {
    const fromDate = moment(from).startOf('day');
    const toDate = moment(to).endOf('day');

    const allExpense = await TotalExpense.find({
      date: {
        $gte: fromDate.toDate(),
        $lte: toDate.toDate(),
      },
    })
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

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

    if (allExpense.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < allExpense.length; i++) {
        grandTotalExpense += allExpense[i].amount;
      }
    }

    if (allIncome.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < allIncome.length; i++) {
        grandTotalIncome += allIncome[i].grandTotal;
      }
    }

    res.send({
      allIncome,
      grandTotalExpense,
      grandTotalIncome,
      totalPages: Math.ceil(Number(count) / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
    console.error(err.message);
  }
};

module.exports = {
  getTotalReport,
};
