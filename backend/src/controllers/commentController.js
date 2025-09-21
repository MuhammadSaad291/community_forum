const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { changeScores } = require('../utils/reputation');


exports.createComment = async (req, res) => {
const { content } = req.body;
const postId = req.params.id;
if (!content) return res.status(400).json({ message: 'Missing content' });
const post = await Post.findById(postId);
if (!post) return res.status(404).json({ message: 'Post not found' });
const comment = await Comment.create({ post: postId, author: req.user._id, content });
res.status(201).json({ comment });
};


exports.voteComment = async (req, res) => {
const { type } = req.body; // 'up' or 'down'
if (!['up', 'down'].includes(type)) return res.status(400).json({ message: 'Invalid vote type' });
const comment = await Comment.findById(req.params.id);
if (!comment) return res.status(404).json({ message: 'Comment not found' });


const voterId = req.user._id;
const authorId = comment.author;


const existing = comment.votes.find(v => v.user.toString() === voterId.toString());
const oldType = existing ? existing.type : null;


if (!existing) {
comment.votes.push({ user: voterId, type });
} else if (existing.type === type) {
// toggle off
comment.votes = comment.votes.filter(v => v.user.toString() !== voterId.toString());
} else {
existing.type = type;
}


await comment.save();
await changeScores({ targetId: authorId, voterId, oldType, newType: (oldType === type ? null : type), isComment: true });
res.json({ ok: true, votes: comment.votes.length });
};