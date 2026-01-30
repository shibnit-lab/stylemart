const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by the model pre-save hook? No, seeder usually inserts directly, or uses Model.create which triggers hooks.
        // If using insertMany, hooks might NOT fire depending on mongoose version/options. 
        // Best to hash it here or use create(). 
        // Actually, widespread MERN practice is to put plain text here and let the seeder logic handle it, OR hash it manually here.
        // Given the model has a pre-save hook, if we use User.create(), it works. If we use User.insertMany(), it might not.
        // Let's assume we'll use insertMany for speed, so I should probably hash them or use the Model loop.
        // A safer bet for a simple seeder is to let the seeder script handle the import logic.
        // I'll put plain text here and handle hashing in seeder if needed, or rely on the hook if I use create.
        // Wait, standard MERN tutorials often use insertMany and manual hashing in the data file.
        // Let's just put the raw data here.
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

module.exports = users;
