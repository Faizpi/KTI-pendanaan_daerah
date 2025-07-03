// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  validateTahap,
  getBlockchain,
  deleteProject, // ✅ ditambahkan
} = require("../controllers/projectController");

const upload = multer({ dest: "uploads/" });

// Route pengajuan proyek oleh Pemda
router.post("/projects", protect, upload.single("dokumen"), createProject);

// Route semua pihak untuk lihat proyek
router.get("/projects", getProjects);

// Route validasi oleh validator
router.post("/projects/validate", protect, validateTahap);

// Route blockchain
router.get("/projects/blockchain", getBlockchain);

// Route hapus proyek
router.delete("/projects/:id", protect, deleteProject);

module.exports = router;
