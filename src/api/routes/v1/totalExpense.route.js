const express = require('express');
const controller = require('../../controllers/totalExpense.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .get('/search', authorize(), controller.getTotalExpense)
  .post('/', authorize(), controller.addExpense);

module.exports = router;
