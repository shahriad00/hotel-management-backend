const express = require('express');
const controller = require('../../controllers/room.controller');
const { authorize } = require('../../middlewares/auth');
const { imageUpload } = require('../../middlewares/uploadImage');

const router = express.Router();

router
  .get('/room-type/:id', authorize(), controller.getSingleRoomType)
  .get('/room-type', authorize(), controller.getAllRoomTypes)
  .post('/room-type', authorize(), controller.addRoomType)
  .patch('/room-type/:id', authorize(), controller.updateRoomType)
  .patch('/unpublish-room-type/:id', authorize(), controller.unpublishRoomType);

router
  .get('/room/:id', authorize(), controller.getSingleRoom)
  .get('/rooms', authorize(), controller.getAllRoom)
  .post('/room', authorize(), imageUpload.array('images', 4), controller.addRoom)
  .patch('/room/:id', authorize(), imageUpload.array('images', 4), controller.updateRoom)
  .patch('/unpublish-room/:id', authorize(), controller.unpublishRoom);

// search
router
  .get('/search', authorize(), controller.getAvailableRooms)
  .get('/all-room-status', authorize(), controller.getAllRoomStatus);

module.exports = router;
