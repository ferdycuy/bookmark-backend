const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    default: 'Uncategorized'
  }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
