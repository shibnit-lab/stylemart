const express = require('express');
const router = express.Router();
const {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} = require('../controllers/authController');
const { getDashboardStats } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/users').get(protect, admin, getUsers);
router.route('/stats').get(protect, admin, getDashboardStats);
router
    .route('/users/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

module.exports = router;
