const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mapping instansi otomatis untuk validator
const instansiMap = {
  "validator-kpk": "KPK",
  "validator-bpkp": "BPKP",
};

// Role yang diizinkan
const allowedRoles = ["pemda", "validator-kpk", "validator-bpkp", "masyarakat"];

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Cek role valid
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Role tidak valid" });
    }

    // Cek email sudah digunakan
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email sudah digunakan" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Buat user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      instansi: instansiMap[role] || null,
    });

    res.status(201).json({ message: "Registrasi berhasil" });

  } catch (err) {
    console.error("❌ Error Register:", err);
    res.status(500).json({ message: "Server error saat register" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // Cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Kirim data user & token
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        instansi: user.instansi,
      },
      token,
    });

  } catch (err) {
    console.error("❌ Error Login:", err);
    res.status(500).json({ message: "Login gagal karena server error" });
  }
};
