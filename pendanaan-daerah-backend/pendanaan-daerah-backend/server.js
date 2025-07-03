// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const seedUsers = require('./utils/seedUsers'); // ← ini dia

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedUsers(); // ← panggil saat server nyala
  })
  .catch((err) => console.log('DB Error:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const User = require('./models/User'); // pastikan model User sudah dibuat

const seedStaticUsers = async () => {
  const users = [
    {
      name: 'Pemda',
      email: 'pemda@example.com',
      password: 'pemda123',
      role: 'pemda',
    },
    {
      name: 'KPK Validator',
      email: 'kpk@example.com',
      password: 'kpk123',
      role: 'validator-kpk',
    },
    {
      name: 'BPKP Validator',
      email: 'bpkp@example.com',
      password: 'bpkp123',
      role: 'validator-bpkp',
    }
  ];

  for (const u of users) {
    const exist = await User.findOne({ email: u.email });
    if (!exist) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashedPassword });
    }
  }
};

seedStaticUsers();
