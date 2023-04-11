const express = require('express');
const path = require('path');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);

router.use('/auth', authRoutes);

router.use('/room', roomRoutes);

router.use('/room', (req, res) => {
  res.send({ message: path.join(__dirname, '../public/images/seven-earth.png') });
});

module.exports = router;
