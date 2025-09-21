const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
const { username, email, password } = req.body;
if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });
const existing = await User.findOne({ $or: [{ email }, { username }] });
if (existing) return res.status(400).json({ message: 'User already exists' });
const hash = await bcrypt.hash(password, 10);
const user = await User.create({ username, email, passwordHash: hash });
const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, score: user.score } });
};


exports.login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user._id, username: user.username, email: user.email, score: user.score } });
};