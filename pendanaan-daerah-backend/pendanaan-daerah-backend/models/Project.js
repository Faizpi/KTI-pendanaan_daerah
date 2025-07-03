// models/Project.js
const mongoose = require("mongoose");

const tahapSchema = new mongoose.Schema({
  tahapKe: Number,
  dokumenUrl: String,
  status: String,
  validasi: {
    KPK: { type: String, default: "menunggu" },
    BPKP: { type: String, default: "menunggu" },
  },
});

const projectSchema = new mongoose.Schema({
  namaProyek: String,
  deskripsi: String,
  anggaran: Number,
  dokumen: String,
  pemda: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tahapan: [tahapSchema],
  statusGlobal: String
});

module.exports = mongoose.model("Project", projectSchema);
