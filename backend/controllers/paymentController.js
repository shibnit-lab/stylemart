// @desc    Send PayPal Client ID
// @route   GET /api/payment/config/paypal
// @access  Private
const sendPaypalClientId = (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
};

module.exports = { sendPaypalClientId };
