const User = require('../models/User');


exports.getProfile = async (req, res) => {
const username = req.params.username;
const user = await User.findOne({ username }).select('-passwordHash');
if (!user) return res.status(404).json({ message: 'User not found' });
res.json({ user });
};


exports.updateProfile = async (req, res) => {
const userId = req.user._id;
const { avatar, bio } = req.body;
const user = await User.findByIdAndUpdate(userId, { avatar, bio }, { new: true }).select('-passwordHash');
res.json({ user });
};