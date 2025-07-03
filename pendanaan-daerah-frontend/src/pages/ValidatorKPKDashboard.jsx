import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function ValidatorKPKDashboard() {
  const [projects, setProjects] = useState([]);
  const [validating, setValidating] = useState(null); // tahap yang sedang divalidasi

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Gagal mengambil proyek:", err);
    }
  };

  const handleValidasi = async (projectId, tahapKe) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // 🔍 Tambahkan ini untuk debugging
  console.log("Kirim validasi:", {
    projectId,
    tahapKe,
    token: token?.substring(0, 20) + "...", // hanya tampil sebagian token
  });

  try {
    await API.post(
      "/projects/validate",
      { projectId, tahapKe },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("✅ Validasi berhasil");
    fetchProjects(); // refresh data
  } catch (err) {
    console.error("❌ Gagal validasi:", err?.response?.data || err);
    alert("❌ Gagal validasi: " + (err?.response?.data?.message || "Unknown error"));
  }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📋 Validasi Proyek (KPK)</h1>

        {projects.length === 0 ? (
          <p>Tidak ada proyek untuk divalidasi.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-white p-5 rounded shadow mb-6">
              <h2 className="text-lg font-bold">{project.namaProyek}</h2>
              <p className="text-sm text-gray-600">Diajukan oleh: {project.pemda?.name}</p>

              {project.tahapan.map((tahap) => {
                const isValidating = validating === `${project._id}-${tahap.tahapKe}`;

                return (
                  <div
                    key={tahap.tahapKe}
                    className="mt-4 p-3 bg-gray-50 border rounded"
                  >
                    <p><strong>🧾 Tahap {tahap.tahapKe}</strong></p>
                    <p>Status: {tahap.status}</p>
                    <p>Validasi KPK: {tahap.validasi.KPK}</p>
                    <p>Validasi BPKP: {tahap.validasi.BPKP}</p>

                    {tahap.validasi.KPK === "menunggu" && (
                      <button
                        onClick={() => handleValidasi(project._id, tahap.tahapKe)}
                        disabled={isValidating}
                        className={`mt-2 px-4 py-1 rounded text-white ${
                          isValidating ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {isValidating ? "Memvalidasi..." : "Validasi Sekarang"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </>
  );
}
