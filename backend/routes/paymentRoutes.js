const express = require('express');
const router = express.Router();
const { sendPaypalClientId } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/config/paypal').get(protect, sendPaypalClientId);

module.exports = router;
