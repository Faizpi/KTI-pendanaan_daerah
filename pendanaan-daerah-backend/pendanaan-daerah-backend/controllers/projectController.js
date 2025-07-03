const Project = require("../models/Project");
const User = require("../models/User");
const blockchain = require("../utils/blockchain");

const isDev = process.env.NODE_ENV !== "production";

// ✅ [1] Pemda mengajukan proyek baru
exports.createProject = async (req, res) => {
  try {
    const { namaProyek, deskripsi, anggaran } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Dokumen harus diunggah" });
    }

    const tahap = {
      tahapKe: 1,
      dokumenUrl: file.path,
      status: "menunggu",
      validasi: { KPK: "menunggu", BPKP: "menunggu" },
    };

    const newProject = new Project({
      namaProyek,
      deskripsi,
      anggaran,
      pemda: req.user.id,
      tahapan: [tahap],
      statusGlobal: "Menunggu validasi tahap 1"
    });

    await newProject.save();
    res.status(201).json({ message: "✅ Proyek berhasil diajukan", project: newProject });

  } catch (err) {
    console.error("❌ Gagal membuat proyek:", err);
    res.status(500).json({ message: "Server error saat pengajuan proyek" });
  }
};

// ✅ [2] Semua role bisa melihat proyek
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("pemda", "name email");
    res.json(projects);
  } catch (err) {
    console.error("❌ Gagal ambil proyek:", err);
    res.status(500).json({ message: "Gagal mengambil proyek" });
  }
};

// ✅ [3] Validator melakukan validasi
exports.validateTahap = async (req, res) => {
  try {
    const { projectId, tahapKe } = req.body;
    const user = await User.findById(req.user.id);

    if (isDev) {
      console.log("🧾 BODY:", req.body);
      console.log("🔐 Validator ID:", user?._id);
      console.log("👤 Role:", user?.role);
      console.log("🏢 Instansi:", user?.instansi);
    }

    // Validasi role
    if (!["validator-kpk", "validator-bpkp"].includes(user.role)) {
      return res.status(403).json({ message: "Akses ditolak: bukan validator" });
    }

    // Fallback instansi dari role
    let instansi = user.instansi;
    if (!instansi) {
      if (user.role === "validator-kpk") instansi = "KPK";
      if (user.role === "validator-bpkp") instansi = "BPKP";
    }

    // Validasi instansi
    if (!["KPK", "BPKP"].includes(instansi)) {
      return res.status(400).json({ message: "Instansi tidak valid" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Proyek tidak ditemukan" });
    }

    const tahap = project.tahapan.find((t) => t.tahapKe == tahapKe);
    if (!tahap) {
      return res.status(404).json({ message: "Tahapan tidak ditemukan" });
    }

    // Setujui validasi
    tahap.validasi[instansi] = "disetujui";

    // Jika semua validator sudah setuju
    if (tahap.validasi.KPK === "disetujui" && tahap.validasi.BPKP === "disetujui") {
      tahap.status = "siap didanai";
      project.statusGlobal = `Tahap ${tahapKe} siap didanai`;

      const blockData = {
        projectId: project._id.toString(),
        projectName: project.namaProyek,
        tahapKe,
        anggaran: project.anggaran,
        status: "siap didanai",
        timestamp: new Date().toISOString(),
      };

      const newBlock = blockchain.addBlock(blockData);
      if (isDev) console.log("🧱 Block ke blockchain:", newBlock);
    }

    await project.save();
    res.json({ message: `✅ Validasi oleh ${instansi} berhasil`, tahap });

  } catch (err) {
    console.error("❌ Gagal validasi:", err);
    res.status(500).json({ message: "Server error saat validasi" });
  }
};

// ✅ [4] Endpoint blockchain explorer
exports.getBlockchain = (req, res) => {
  try {
    const chain = blockchain.getAllBlocks();
    res.json(chain);
  } catch (err) {
    console.error("❌ Gagal ambil blockchain:", err);
    res.status(500).json({ message: "Gagal mengambil data blockchain" });
  }
};

// ✅ [5] Hapus proyek (khusus Pemda yang mengajukan)
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Proyek tidak ditemukan" });
    }

    // Pastikan hanya pemda yang mengajukan yang boleh hapus
    if (project.pemda.toString() !== req.user.id) {
      return res.status(403).json({ message: "Anda tidak berhak menghapus proyek ini" });
    }

    await Project.findByIdAndDelete(projectId);
    res.json({ message: "🗑️ Proyek berhasil dihapus" });

  } catch (err) {
    console.error("❌ Gagal hapus proyek:", err);
    res.status(500).json({ message: "Server error saat menghapus proyek" });
  }
};
