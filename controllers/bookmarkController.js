const Bookmark = require('../models/Bookmark');

// GET /bookmarks (all milik user)
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// POST /bookmarks
exports.createBookmark = async (req, res) => {
  const { title, url, description, category } = req.body;
  try {
    const newBookmark = new Bookmark({
      title,
      url,
      description,
      category,
      user: req.user.id
    });
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(400).json({ msg: 'Gagal membuat bookmark' });
  }
};

// PUT /bookmarks/:id
exports.updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!bookmark) return res.status(404).json({ msg: 'Bookmark tidak ditemukan' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal update' });
  }
};

// DELETE /bookmarks/:id
exports.deleteBookmark = async (req, res) => {
  try {
    const result = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!result) return res.status(404).json({ msg: 'Bookmark tidak ditemukan' });
    res.json({ msg: 'Berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal hapus' });
  }
};
