const express = require('express');
const controller = require('../../controllers/roomService.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .get('/:id', authorize(), controller.getRoomServices)
  .post('/', authorize(), controller.addRoomService);

module.exports = router;
