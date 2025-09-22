// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// module.exports = async function (req, res, next) {
// const auth = req.headers.authorization;
// if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
// const token = auth.split(' ')[1];
// try {
// const payload = jwt.verify(token, process.env.JWT_SECRET);
// const user = await User.findById(payload.id).select('-passwordHash');
// if (!user) return res.status(401).json({ message: 'Unauthorized' });
// req.user = user;
// next();
// } catch (err) {
// return res.status(401).json({ message: 'Invalid token' });
// }
// };
// backend/middleware/auth.js





// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// module.exports = async (req, res, next) => {
//   try {
//     // ✅ Token from header or cookies
//     const header = req.headers.authorization || req.cookies?.token;
//     if (!header)
//       return res.status(401).json({ message: "No token provided" });

//     const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Option 1: set minimal user info (fast)
//     req.user = {
//       _id: decoded.id,
//       username: decoded.username,
//       email: decoded.email,
//     };

//     // ✅ Option 2: fetch full user document (if you need full profile)
//     // req.user = await User.findById(decoded.id).select("-passwordHash");
//     // if (!req.user) return res.status(401).json({ message: "User not found" });

//     next();
//   } catch (err) {
//     console.error("Auth middleware error:", err.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };


// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// module.exports = async function (req, res, next) {
// const auth = req.headers.authorization;
// if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
// const token = auth.split(' ')[1];
// try {
// const payload = jwt.verify(token, process.env.JWT_SECRET);
// const user = await User.findById(payload.id).select('-passwordHash');
// if (!user) return res.status(401).json({ message: 'Unauthorized' });
// req.user = user;
// next();
// } catch (err) {
// return res.status(401).json({ message: 'Invalid token' });
// }
// };





const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
