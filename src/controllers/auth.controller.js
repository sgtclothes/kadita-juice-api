const authService = require('../services/auth.service');
const { loginSchema } = require('../validators/auth.validator');
const ResponseUtil = require('../utils/response.util');

class AuthController {
  async login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return ResponseUtil.error(res, 'Validation error', 400, error.details);
      }

      const { username, password } = req.body;
      const admin = await authService.validateCredentials(username, password);

      if (!admin) {
        return ResponseUtil.error(res, 'Invalid credentials', 401);
      }

      const token = authService.generateToken(admin);
      return ResponseUtil.success(res, { token }, 'Login successful');
    } catch (error) {
      return ResponseUtil.error(res, 'Login failed');
    }
  }

  async logout(req, res) {
    return ResponseUtil.success(res, null, 'Logout successful');
  }
}

module.exports = new AuthController();