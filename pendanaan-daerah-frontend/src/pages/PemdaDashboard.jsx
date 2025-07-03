import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function PemdaDashboard() {
  const [form, setForm] = useState({
    namaProyek: "",
    deskripsi: "",
    anggaran: "",
    dokumen: null,
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      const pemdaProjects = res.data.filter((p) => p.pemda._id === userId);
      setProjects(pemdaProjects);
    } catch (err) {
      console.error("Gagal fetch proyek:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("namaProyek", form.namaProyek);
      data.append("deskripsi", form.deskripsi);
      data.append("anggaran", form.anggaran);
      data.append("dokumen", form.dokumen);

      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await API.post("/projects", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Proyek berhasil diajukan");
      setForm({ namaProyek: "", deskripsi: "", anggaran: "", dokumen: null });
      fetchProjects(); // refresh
    } catch (err) {
      alert("❌ Gagal ajukan proyek");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus proyek ini?")) return;
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Proyek berhasil dihapus");
      fetchProjects(); // refresh
    } catch (err) {
      alert("❌ Gagal hapus proyek");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-xl mx-auto bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Ajukan Proyek Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="namaProyek"
            value={form.namaProyek}
            onChange={handleChange}
            placeholder="Nama Proyek"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi Proyek"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="anggaran"
            type="number"
            value={form.anggaran}
            onChange={handleChange}
            placeholder="Anggaran (Rp)"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="dokumen"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Ajukan"}
          </button>
        </form>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">📋 Proyek Anda</h2>
        {projects.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold text-lg">{p.namaProyek}</h3>
            <p>Deskripsi: {p.deskripsi}</p>
            <p>Anggaran: Rp {p.anggaran}</p>
            <p>Status: {p.statusGlobal}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
