const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};

exports.cliColorGreen = (str) => `\x1b[32m${str}\x1b[0m`;
exports.cliColorYellow = (str) => `\x1b[33m${str}\x1b[0m`;
exports.cliColorRed = (str) => `\x1b[31m${str}\x1b[0m`;