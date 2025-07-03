import Navbar from "../components/Navbar";

export default function MasyarakatDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Transparansi Proyek</h1>
        <p>Lihat semua proyek yang diajukan dan statusnya</p>
        {/* Tambahkan list proyek yang bisa dilihat masyarakat */}
      </div>
    </>
  );
}

