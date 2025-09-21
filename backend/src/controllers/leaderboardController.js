const User = require('../models/User');


exports.getLeaderboard = async (req, res) => {
const limit = parseInt(req.query.limit || '10', 10);
const users = await User.find().select('username avatar score').sort({ score: -1 }).limit(limit).lean();
res.json({ users });
};