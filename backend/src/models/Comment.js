const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const voteSchema = new Schema({
user: { type: Schema.Types.ObjectId, ref: 'User' },
type: { type: String, enum: ['up', 'down'] }
});


const commentSchema = new Schema({
post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
content: { type: String, required: true },
votes: [voteSchema],
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Comment', commentSchema);