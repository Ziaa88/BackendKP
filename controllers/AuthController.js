const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');

class AuthController {
   static async login(req, res) {
    const { username, password } = req.body;
    try {
      const { user, token } = await AuthService.login({ username, password });
      const decoded = jwt.decode(token);
      res.json({ user, token, role: decoded.role });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async adminRegister(req, res) {
    try {
      const user = await AuthService.adminRegister(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async adminLogin(req, res) {
    try {
      const { username, password } = req.body;
      const { admin, token } = await AuthService.adminLogin({ username, password });
      const decoded = jwt.decode(token);
      res.json({ admin, token, role: decoded.role });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
