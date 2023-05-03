const express = require('express');
const controller = require('../../controllers/checkIn.controller');
const { authorize } = require('../../middlewares/auth');
const { imageUpload } = require('../../middlewares/uploadImage');

const router = express.Router();

router
  .get('/check-in/:id', authorize(), controller.getSingleCheckIn)
  .get('/check-in', authorize(), controller.checkInPagination)
  .get('/check-out', authorize(), controller.checkOutPagination)
  .get('/all-check-in', authorize(), controller.getAllCheckIns)
  .post('/check-in/', authorize(), imageUpload.array('images', 6), controller.addCheckIn)
  .patch('/check-in/move-to-check-in/:id', authorize(), controller.updateBookingToCheckIn)
  .patch('/check-out/:id', authorize(), controller.updateToCheckOut);

module.exports = router;
