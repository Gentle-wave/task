const express = require('express');
const { getUsers, getUserById } = require('../controller/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById);

module.exports = router;
