const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'https://bookmark-frontend.vercel.app' // (nanti kalau sudah deploy)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Bookmark Manager API is running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.log(err));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const bookmarkRoutes = require('./routes/webRoutes');
app.use('/api/bookmarks', bookmarkRoutes);