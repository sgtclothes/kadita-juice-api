const jwt = require('jsonwebtoken');
const ResponseUtil = require('../utils/response.util');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ResponseUtil.error(res, 'No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.admin = decoded;
    next();
  } catch (error) {
    return ResponseUtil.error(res, 'Invalid or expired token', 401);
  }
};