const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');


router.get('/:username', getProfile);
router.put('/me', auth, updateProfile);


module.exports = router;