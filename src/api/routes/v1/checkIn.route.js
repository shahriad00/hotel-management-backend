const express = require('express');
const controller = require('../../controllers/checkIn.controller');
const { authorize } = require('../../middlewares/auth');
const { imageUpload } = require('../../middlewares/uploadImage');

const router = express.Router();

router
  .get('/:id', authorize(), controller.addCheckIn)
  .get('/', authorize(), controller.getAllCheckIns)
  .post('/', authorize(), imageUpload.array('images', 6), controller.addCheckIn)
  .patch('/:id', authorize(), controller.updateRoomType);
