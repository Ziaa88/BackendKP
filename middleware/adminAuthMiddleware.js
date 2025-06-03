const authenticateToken = require('./authMiddleware');

function adminAuth(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
}

module.exports = [authenticateToken, adminAuth];