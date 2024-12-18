const { Admin } = require('../models');
const jwt = require('jsonwebtoken');

class AuthService {
  async validateCredentials(username, password) {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin || !(await admin.validatePassword(password))) {
      return null;
    }
    return admin;
  }

  generateToken(admin) {
    return jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

module.exports = new AuthService();