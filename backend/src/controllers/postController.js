// const Post = require('../models/Post');
// const Comment = require('../models/Comment');
// const { changeScores } = require('../utils/reputation');


// exports.createPost = async (req, res) => {
// const { title, content, tags } = req.body;
// if (!title || !content) return res.status(400).json({ message: 'Missing fields' });
// const post = await Post.create({ title, content, tags: tags || [], author: req.user._id });
// res.status(201).json({ post });
// };


// exports.getPosts = async (req, res) => {
// const posts = await Post.find().populate('author', 'username avatar score').sort({ createdAt: -1 }).lean();
// // add comments count
// const postsWithCounts = await Promise.all(posts.map(async (p) => {
// const count = await Comment.countDocuments({ post: p._id });
// return { ...p, commentsCount: count };
// }));
// res.json({ posts: postsWithCounts });
// };


// exports.getPost = async (req, res) => {
// const post = await Post.findById(req.params.id).populate('author', 'username avatar score').lean();
// if (!post) return res.status(404).json({ message: 'Post not found' });
// const comments = await Comment.find({ post: post._id }).populate('author', 'username avatar score').lean();
// res.json({ post: { ...post, comments } });
// };


// exports.updatePost = async (req, res) => {
// const post = await Post.findById(req.params.id);
// if (!post) return res.status(404).json({ message: 'Post not found' });
// if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
// const { title, content, tags } = req.body;
// post.title = title || post.title;
// post.content = content || post.content;
// post.tags = tags || post.tags;
// await post.save();
// res.json({ post });
// };


// exports.deletePost = async (req, res) => {
// const post = await Post.findById(req.params.id);
// if (!post) return res.status(404).json({ message: 'Post not found' });
// if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
// await Comment.deleteMany({ post: post._id });
// await post.remove();
// res.json({ message: 'Deleted' });
// };


// // Vote on a post
// exports.votePost = async (req, res) => {
// const { type } = req.body; // 'up' or 'down'
// if (!['up', 'down'].includes(type)) return res.status(400).json({ message: 'Invalid vote type' });
// };
// backend/controllers/postController.js




const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { changeScores } = require('../utils/reputation');

exports.createPost = async (req, res) => {
const { title, content, tags } = req.body;
if (!title || !content) return res.status(400).json({ message: 'Missing fields' });
const post = await Post.create({ title, content, tags: tags || [], author: req.user._id });
res.status(201).json({ post });
};

exports.getPosts = async (req, res) => {
const posts = await Post.find().populate('author', 'username avatar score').sort({ createdAt: -1 }).lean();
// add comments count
const postsWithCounts = await Promise.all(posts.map(async (p) => {
const count = await Comment.countDocuments({ post: p._id });
return { ...p, commentsCount: count };
}));
res.json({ posts: postsWithCounts });
};

exports.getPost = async (req, res) => {
const post = await Post.findById(req.params.id).populate('author', 'username avatar score').lean();
if (!post) return res.status(404).json({ message: 'Post not found' });
const comments = await Comment.find({ post: post._id }).populate('author', 'username avatar score').lean();
res.json({ post: { ...post, comments } });
};

exports.updatePost = async (req, res) => {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Post not found' });
if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
const { title, content, tags } = req.body;
post.title = title || post.title;
post.content = content || post.content;
post.tags = tags || post.tags;
await post.save();
res.json({ post });
};

exports.deletePost = async (req, res) => {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Post not found' });
if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
await Comment.deleteMany({ post: post._id });
await post.remove();
res.json({ message: 'Deleted' });
};

// Vote on a post
exports.votePost = async (req, res) => {
const { type } = req.body; // 'up' or 'down'
if (!['up', 'down'].includes(type)) return res.status(400).json({ message: 'Invalid vote type' });
};