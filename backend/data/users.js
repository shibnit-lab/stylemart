const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'password123',
        isAdmin: true,

    },
];

module.exports = users;
