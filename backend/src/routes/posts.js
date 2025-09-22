// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const {
// createPost,
// getPosts,
// getPost,
// updatePost,
// deletePost,
// votePost
// } = require('../controllers/postController');


// router.get('/', getPosts);
// router.post('/', auth, createPost);
// router.get('/:id', getPost);
// router.put('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.post('/:id/vote', auth, votePost);


// module.exports = router;
// backend/routes/posts.js



const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // must set req.user
const {
  createPost, getPosts, getPost, updatePost, deletePost, votePost
} = require('../controllers/postController');

router.get('/', getPosts);
router.post('/', auth, createPost);        // <-- auth required
router.get('/:id', getPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/vote', auth, votePost);

module.exports = router;
