const mongoose = require("mongoose");

const TahapSchema = new mongoose.Schema({
  tahapKe: Number,
  dokumenUrl: String,
  status: { type: String, default: "menunggu" },
  validasi: {
    KPK: { type: String, default: "menunggu" },
    BPKP: { type: String, default: "menunggu" }
  }
});

const ProjectSchema = new mongoose.Schema({
  namaProyek: String,
  pemda: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tahapan: [TahapSchema]
});

module.exports = mongoose.model("Project", ProjectSchema);

