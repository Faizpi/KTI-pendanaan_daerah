import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function MasyarakatDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("❌ Gagal fetch proyek:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">📋 Daftar Proyek</h1>
        {projects.length === 0 ? (
          <p className="text-gray-600">Belum ada proyek.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p._id} className="p-4 bg-white rounded shadow">
                <h2 className="text-lg font-semibold">{p.namaProyek}</h2>
                <p className="text-sm text-gray-700">{p.deskripsi}</p>
                <p className="text-sm">Anggaran: Rp {p.anggaran}</p>
                <p className="text-sm">Status: {p.statusGlobal}</p>
                <p className="text-sm">Pemda: {p.pemda?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
