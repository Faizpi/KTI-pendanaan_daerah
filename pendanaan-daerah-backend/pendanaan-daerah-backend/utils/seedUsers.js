// utils/seedUsers.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedUsers = async () => {
  const users = [
    {
      name: 'Pemda Tangerang',
      email: 'pemda@tangerang.go.id',
      password: await bcrypt.hash('pemda123', 10),
      role: 'pemda'
    },
    {
      name: 'Validator KPK',
      email: 'kpk@validator.go.id',
      password: await bcrypt.hash('kpk123', 10),
      role: 'validator-kpk'
    },
    {
      name: 'Validator BPKP',
      email: 'bpkp@validator.go.id',
      password: await bcrypt.hash('bpkp123', 10),
      role: 'validator-bpkp'
    }
  ];

  for (const user of users) {
    const exist = await User.findOne({ email: user.email });
    if (!exist) await User.create(user);
  }

  console.log('✅ Akun default sudah siap');
};

module.exports = seedUsers;
