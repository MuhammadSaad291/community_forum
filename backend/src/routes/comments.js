// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const { createComment, voteComment } = require('../controllers/commentController');


// router.post('/:id', auth, createComment); // post/:id/comments will be prefixed from parent
// router.post('/:id/vote', auth, voteComment);


// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const { createComment, voteComment } = require("../controllers/commentController");

// // Add comment to a post
// router.post("/posts/:id/comments", auth, createComment);

// // Vote on a comment
// router.post("/comments/:id/vote", auth, voteComment);

// module.exports = router;



const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createComment, voteComment } = require("../controllers/commentController");

// Add a comment to a post
router.post("/posts/:id/comments", auth, createComment);

// Vote on a comment
router.post("/comments/:id/vote", auth, voteComment);

module.exports = router;
