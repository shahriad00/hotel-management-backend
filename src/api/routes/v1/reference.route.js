const express = require('express');
const controller = require('../../controllers/reference.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .get('/:id', authorize(), controller.getSingleReference)
  .get('/', authorize(), controller.getAllReference)
  .post('/', authorize(), controller.addReference)
  .patch('/:id', authorize(), controller.updateReference);

module.exports = router;
