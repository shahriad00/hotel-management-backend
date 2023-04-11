const express = require('express');
const controller = require('../../controllers/room.controller');
const { authorize } = require('../../middlewares/auth');
const { imageUpload } = require('../../middlewares/uploadImage');

const router = express.Router();

router
  .route('/room-type')
  .post(authorize(), controller.addRoomType);

router
  .route('/room')
  .post(authorize(), imageUpload.array('images', 4), controller.addRoom);

module.exports = router;
