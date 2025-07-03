const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Check if no token
// In your auth middleware, add better error handling:
if (!token) {
  return res.status(401).json({ error: 'No token provided' });
}

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }
  return res.status(401).json({ error: 'Invalid token' });
}
};