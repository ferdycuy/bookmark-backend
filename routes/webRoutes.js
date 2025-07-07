const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');

router.get('/', auth, getBookmarks);
router.post('/', auth, createBookmark);
router.put('/:id', auth, updateBookmark);
router.delete('/:id', auth, deleteBookmark);

module.exports = router;
