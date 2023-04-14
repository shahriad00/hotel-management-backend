const express = require('express');
// const path = require('path');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');
const checkInRoute = require('./checkIn.route');
const referenceRoute = require('./reference.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/', express.static('public'));

router.use('/users', userRoutes);

router.use('/auth', authRoutes);

router.use('/', roomRoutes);

router.use('/checkIn', checkInRoute);

router.use('/reference', referenceRoute);

module.exports = router;
