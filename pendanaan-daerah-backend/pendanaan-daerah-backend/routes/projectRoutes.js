const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const {
  createProject,
  getProjects,
  validateTahap,
} = require("../controllers/projectController");

const upload = multer({ dest: "uploads/" });

router.post("/projects", auth, upload.single("dokumen"), createProject);
router.get("/projects", getProjects); // publik
router.post("/projects/validate", auth, validateTahap);

module.exports = router;

