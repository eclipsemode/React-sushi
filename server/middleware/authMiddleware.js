const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError');
const TokenService = require('../service/TokenService');

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ').at(1)
    if (!token) {
      return next(ApiError.unauthorized());
    }
    const tokenData = TokenService.validateAccessToken(token);
    if (!tokenData) {
      return next(ApiError.unauthorized());
    }
    req.user = tokenData
    next();
  } catch (e) {
    return next(ApiError.unauthorized());
  }
};