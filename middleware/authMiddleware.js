const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed', error: err });
        }
        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.roleId === 2) {  // Admin role ID is 2
        next();
    } else {
        return res.status(403).json({ message: 'Admin access required' });
    }
};

const authorizeSuperadmin = (req, res, next) => {
    if (req.user && req.user.roleId === 1) {  // Superadmin role ID is 1
        next();
    } else {
        return res.status(403).json({ message: 'Superadmin access required' });
    }
};

module.exports = {
    authenticateToken,
    authorizeAdmin,
    authorizeSuperadmin
};
