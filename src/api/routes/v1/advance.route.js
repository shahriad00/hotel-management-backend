const express = require('express');
const controller = require('../../controllers/advancePayment.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .get('/:id', authorize(), controller.getAdvancePayment)
  .post('/', authorize(), controller.addAdvancePayment);

module.exports = router;
