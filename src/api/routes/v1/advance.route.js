const express = require('express');
const controller = require('../../controllers/advancePayment.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .get('/advance-payment/:id', authorize(), controller.getAdvancePayment)
  .post('/advance-payment/', authorize(), controller.addAdvancePayment);

module.exports = router;
