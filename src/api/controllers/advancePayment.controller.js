/* eslint-disable no-plusplus */
const AdvancePayment = require('../models/advance.model');

const addAdvancePayment = async (req, res, next) => {
  try {
    const _id = req.body.checkInID;

    await AdvancePayment.create({ ...req.body });

    const advanceAmount = await AdvancePayment.find({ checkInID: _id });

    let totalAmount = 0;

    for (let i = 0; i < advanceAmount.length; i++) {
      totalAmount += parseFloat(advanceAmount[i].amount);
    }
    res.status(200).send({ totalAmount });
  } catch (err) {
    next(err);
  }
};

const getAdvancePayment = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const advanceAmount = await AdvancePayment.find({ checkInID: _id });

    let totalAmount = 0;

    for (let i = 0; i < advanceAmount.length; i++) {
      totalAmount += parseFloat(advanceAmount[i].amount);
    }
    res.status(200).send({ advanceAmount, totalAmount });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addAdvancePayment,
  getAdvancePayment,
};
