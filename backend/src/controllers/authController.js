// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');


// // exports.register = async (req, res) => {
// // const { username, email, password } = req.body;

// // if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });
// // const existing = await User.findOne({ $or: [{ email }, { username }] });
// // if (existing) return res.status(400).json({ message: 'User already exists' });
// // const hash = await bcrypt.hash(password, 10);
// // const user = await User.create({ username, email, passwordHash: hash });
// // const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
// // res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, score: user.score } });
// // };


// // exports.login = async (req, res) => {
// // const { email, password } = req.body;
// // if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
// // const user = await User.findOne({ email });
// // if (!user) return res.status(400).json({ message: 'Invalid credentials' });
// // const ok = await bcrypt.compare(password, user.passwordHash);
// // if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
// // const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
// // res.json({ token, user: { id: user._id, username: user.username, email: user.email, score: user.score } });
// // };


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Helper function to generate JWT
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, username: user.username, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
//   );
// };

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate input
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     // Check if user exists
//     const existing = await User.findOne({ $or: [{ email }, { username }] });
//     if (existing) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({ username, email, passwordHash, score: 0 });

//     // Generate token
//     const token = generateToken(user);

//     // Send response
//     res.status(201).json({
//       token,
//       user: { id: user._id, username: user.username, email: user.email, score: user.score },
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate token
//     const token = generateToken(user);

//     // Send response
//     res.json({
//       token,
//       user: { id: user._id, username: user.username, email: user.email, score: user.score },
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // ✅ Safe Token Generator Function
// const generateToken = (user) => {
//   if (!process.env.JWT_SECRET) {
//     console.error("❌ JWT_SECRET missing in .env file");
//     throw new Error("JWT secret not configured");
//   }

//   return jwt.sign(
//     {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
//   );
// };

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const existing = await User.findOne({ $or: [{ email }, { username }] });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await User.create({ username, email, passwordHash, score: 0 });

//     const token = generateToken(user);

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         score: user.score,
//       },
//     });
//   } catch (err) {
//     console.error("Register error:", err.message);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user);

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         score: user.score,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err.message);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // ✅ Helper function: Generate JWT safely
// const generateToken = (user) => {
//   if (!process.env.JWT_SECRET) {
//     console.error("❌ JWT_SECRET missing in .env file");
//     throw new Error("JWT secret not configured");
//   }

//   return jwt.sign(
//     { id: user._id, username: user.username, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
//   );
// };

// // ======================== REGISTER ========================
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate fields
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     // Check existing user
//     const existing = await User.findOne({ $or: [{ email }, { username }] });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({ username, email, passwordHash, score: 0 });

//     // Generate token
//     const token = generateToken(user);

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         score: user.score,
//       },
//     });
//   } catch (err) {
//     console.error("❌ Register error:", err.message);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // ======================== LOGIN ========================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("📩 Login attempt:", email);

//     // Validate fields
//     if (!email || !password) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare password (correct field: passwordHash ✅)
//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate token
//     const token = generateToken(user);

//     // Send response
//     return res.json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         score: user.score,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("❌ Backend login error:", err.message);
//     return res.status(500).json({ message: err.message || "Server error" });
//   }
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Token generator function
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET missing in .env file");
    throw new Error("JWT secret not configured");
  }

  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("📝 Register attempt:", { username, email });

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      console.warn("⚠️ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash,
      score: 0,
    });

    const token = generateToken(user);

    console.log("✅ User registered successfully:", user.email);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        score: user.score,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err.message, err.stack);
    return res.status(500).json({
      message: "Server error during register",
      error: err.message,
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("⚠️ User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.warn("⚠️ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    console.log("✅ Login successful:", email);

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        score: user.score,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message, err.stack);
    return res.status(500).json({
      message: "Server error during login",
      error: err.message,
    });
  }
};
