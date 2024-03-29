const express = require('express');
const controller = require('../../controllers/totalIncome.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .get('/search', authorize(), controller.totalIncome);

module.exports = router;
