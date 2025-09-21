const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createComment, voteComment } = require('../controllers/commentController');


router.post('/:id', auth, createComment); // post/:id/comments will be prefixed from parent
router.post('/:id/vote', auth, voteComment);


module.exports = router;