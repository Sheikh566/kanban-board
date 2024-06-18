const User = require('../model/UserModel');
const { verifyToken } = require('../helper/util-helper');

// Middleware to inject user into req
const injectUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password'); // Exclude password from the result
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying token', error: error.message });
  }
};

module.exports = injectUser;