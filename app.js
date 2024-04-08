const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const sequelize = require('./Database');
const { authenticateToken, authorizeAdmin, authorizeSuperadmin } = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/book', authenticateToken, bookRoutes);  // Authenticate all book routes
app.use('/admin/book', authenticateToken, authorizeAdmin, bookRoutes);  // Authenticate and authorize Admin for specific book routes
app.use('/superadmin/book', authenticateToken, authorizeSuperadmin, bookRoutes);  // Authenticate and authorize Superadmin for specific book routes

//mysql sequelizeconnection check
sequelize.sync()
    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.error('Error Connected database:', err);
    });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
