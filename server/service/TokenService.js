const jwt = require('jsonwebtoken');
const { Token } = require('../models/models');

class TokenService {
    generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, { expiresIn: '30m' });
      const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFFRESH, { expiresIn: '30d' });
      return {
        accessToken,
        refreshToken
      }
    }

    validateAccessToken(token) {
      try {
        const userData = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
        return userData;
      } catch (e) {
        return null;
      }
    }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY_REFFRESH);
      return userData;
    } catch (e) {
      return null;
    }
  }

    async saveToken(userId, refreshToken) {
      const tokenData = await Token.findOne({ where: {userId} });

      if (tokenData) {
        return await Token.update({ refreshToken }, { where: { userId } })
      }
      return await Token.create({ userId, refreshToken });
    }

    async removeToken(refreshToken) {
      return await Token.destroy({
        where: { refreshToken }
      });
    }

    async findToken(refreshToken) {
      const tokenData = await Token.findOne({ where: { refreshToken } });
      return tokenData;
    }
}

module.exports = new TokenService();