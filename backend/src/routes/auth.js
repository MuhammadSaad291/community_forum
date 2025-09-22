// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


// const voteSchema = new Schema({
// user: { type: Schema.Types.ObjectId, ref: 'User' },
// type: { type: String, enum: ['up', 'down'] }
// });


// const postSchema = new Schema({
// title: { type: String, required: true },
// content: { type: String, required: true },
// tags: [{ type: String }],
// author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// votes: [voteSchema],
// createdAt: { type: Date, default: Date.now }
// });


// module.exports = mongoose.model('Post', postSchema);

const express = require("express");
const { login, register } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
