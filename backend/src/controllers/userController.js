// const User = require('../models/User');


// exports.getProfile = async (req, res) => {
// const username = req.params.username;
// const user = await User.findOne({ username }).select('-passwordHash');
// if (!user) return res.status(404).json({ message: 'User not found' });
// res.json({ user });
// };


// exports.updateProfile = async (req, res) => {
// const userId = req.user._id;
// const { avatar, bio } = req.body;
// const user = await User.findByIdAndUpdate(userId, { avatar, bio }, { new: true }).select('-passwordHash');
// res.json({ user });
// };

const User = require("../models/User");
const Post = require("../models/Post");

// ✅ GET /api/users/:username
exports.getProfile = async (req, res) => {
  try {
    const username = req.params.username;

    // Find user by username
    const user = await User.findOne({ username }).select("-passwordHash").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find user's posts
    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .lean();

    // Send user + posts
    res.json({
      user: {
        ...user,
        posts,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT /api/users/me
exports.updateProfile = async (req, res) => {
  try {
    const { avatar, bio } = req.body;

    // Find user by id
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update only fields provided
    if (avatar !== undefined) user.avatar = avatar;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
