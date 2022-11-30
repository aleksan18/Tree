const rateLimit = require('express-rate-limit');
const rateLimiterAuth = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 20,
    message: 'You have exceeded the 20 requests in 24 hrs limit!', 
    standardHeaders: true,
    legacyHeaders: false,
  });
const rateLimiterOthers =rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 200,
    message: 'You have exceeded the 20 requests in 24 hrs limit!', 
    standardHeaders: true,
    legacyHeaders: false,
  });
module.exports ={ 
    rateLimiterAuth,
    rateLimiterOthers
}