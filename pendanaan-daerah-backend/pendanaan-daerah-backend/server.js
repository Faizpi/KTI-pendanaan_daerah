const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes'); // ⬅️ Tambahan penting
const seedUsers = require('./utils/seedUsers');

dotenv.config();
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await seedUsers();
  })
  .catch((err) => console.log('❌ DB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes); // ⬅️ Pastikan route project dipasang di sini

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
