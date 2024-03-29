const express = require('express');
// const path = require('path');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');
const checkInRoute = require('./checkIn.route');
const referenceRoute = require('./reference.route');
const advanceRoute = require('./advance.route');
const roomServiceRoute = require('./roomService.route');
const totalIncomeRoute = require('./totalIncome.route');
const totalExpenseRoute = require('./totalExpense.route');
const totalReportRoute = require('./totalReport.route');

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

router.use('/', checkInRoute);

router.use('/reference', referenceRoute);

router.use('/advance-payment', advanceRoute);

router.use('/room-service', roomServiceRoute);

router.use('/expense', totalExpenseRoute);

router.use('/all-income', totalIncomeRoute);

router.use('/all-report', totalReportRoute);

module.exports = router;
