const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');


const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentResult,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        // 1. Verify Stock for all items first
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                res.status(404).json({ message: `Product not found: ${item.name}` });
                return;
            }
            if (product.countInStock < item.qty) {
                res.status(400).json({ message: `Insufficient stock for ${item.name}` });
                return;
            }
        }

        // 2. Create Order
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentResult,
            isPaid: paymentResult ? true : false,
            paidAt: paymentResult ? Date.now() : null,
        });

        const createdOrder = await order.save();

        // 3. Deduct Stock
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            product.countInStock = product.countInStock - item.qty;
            await product.save();
        }

        res.status(201).json(createdOrder);
    }
};


const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};


const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};


const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};


const getDashboardStats = async (req, res) => {
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();

    const orders = await Order.find({});
    const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name');

    res.json({
        ordersCount,
        productsCount,
        usersCount,
        totalSales,
        recentOrders
    });
};


const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    getDashboardStats,
    updateOrderToDelivered,
};
