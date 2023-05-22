const moment = require('moment/moment');
const TotalExpense = require('../models/totalExpense.model');

// ------------------- add expense --------------------------
const addExpense = async (req, res, next) => {
  try {
    const expense = await TotalExpense.create({ ...req.body });
    res.status(200).send({
      message: 'Expense added successfully',
      expense,
    });
  } catch (error) {
    next(error);
  }
};

// ------------ get All expenses-----------------------
const getTotalExpense = async (req, res, next) => {
  const { page = 1, limit = 30, from = '', to = '' } = req.query;
  let grandTotal = 0;
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

    const count = await TotalExpense.find({
      date: {
        $gte: fromDate.toDate(),
        $lte: toDate.toDate(),
      },
    }).countDocuments();

    if (allExpense.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < allExpense.length; i++) {
        grandTotal += allExpense[i].amount;
      }
    }

    res.send({
      allExpense,
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
  addExpense,
  getTotalExpense,
};
