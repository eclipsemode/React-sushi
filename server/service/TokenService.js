const jwt = require('jsonwebtoken');
const { Token } = require('../models/models');

class TokenService {
    generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });
      const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFFRESH, { expiresIn: '30d' });
      return {
        accessToken,
        refreshToken
      }
    }

    async saveToken(userId, refreshToken) {
      const tokenData = await Token.findOne({ where: {userId} });

      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }
      return await Token.create({ userId, refreshToken });
    }
}

module.exports = new TokenService();