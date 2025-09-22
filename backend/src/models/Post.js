// // const mongoose = require('mongoose');
// // const Schema = mongoose.Schema;


// // const voteSchema = new Schema({
// // user: { type: Schema.Types.ObjectId, ref: 'User' },
// // type: { type: String, enum: ['up', 'down'] }
// // });


// // const postSchema = new Schema({
// // title: { type: String, required: true },
// // content: { type: String, required: true },
// // tags: [{ type: String }],
// // author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // votes: [voteSchema],
// // createdAt: { type: Date, default: Date.now }
// // });


// // module.exports = mongoose.model('Post', postSchema);


// const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // ✅ Prevent OverwriteModelError
// module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);



const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    votes: { type: Number, default: 0 },
    comments: [CommentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
