const jwt = require('jsonwebtoken');

exports.generate = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    algorithm: 'HS256',
    notBefore: 0,
    expiresIn: 60 * 60 * 24 * 365, // 365 days
    issuer: process.env.APP_DOMAIN,
  });
  return token;
};

exports.parse = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY, {
      algorithm: 'HS256',
      issuer: process.env.APP_DOMAIN,
    });
    return payload;
  } catch (error) {
    return false;
  }
};
