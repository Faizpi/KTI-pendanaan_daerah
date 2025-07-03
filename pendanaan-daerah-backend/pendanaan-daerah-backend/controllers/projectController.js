const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  const { namaProyek } = req.body;
  const file = req.file;

  const tahap = {
    tahapKe: 1,
    dokumenUrl: file.path,
    status: "menunggu",
    validasi: { KPK: "menunggu", BPKP: "menunggu" },
  };

  const newProject = new Project({
    namaProyek,
    pemda: req.user.id,
    tahapan: [tahap],
  });

  await newProject.save();
  res.json({ message: "Proyek diajukan", project: newProject });
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("pemda", "name");
  res.json(projects);
};

exports.validateTahap = async (req, res) => {
  const { projectId, tahapKe } = req.body;
  const user = await User.findById(req.user.id);

  if (user.role !== "validator") return res.status(403).json({ message: "Akses ditolak" });

  const project = await Project.findById(projectId);
  const tahap = project.tahapan.find((t) => t.tahapKe == tahapKe);

  tahap.validasi[user.instansi] = "disetujui";

  if (tahap.validasi.KPK === "disetujui" && tahap.validasi.BPKP === "disetujui") {
    tahap.status = "siap didanai";
  }

  await project.save();
  res.json({ message: "Tahap tervalidasi", tahap });
};

