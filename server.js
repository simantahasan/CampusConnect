require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const materialRoutes = require('./routes/materialRoutes');
const postRoutes = require('./routes/postRoutes');
const verifyRoutes = require('./routes/verify');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 1049;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌:', err));

// Routes
app.use('/api/materials', materialRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('CampusConnect Backend is running!'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
