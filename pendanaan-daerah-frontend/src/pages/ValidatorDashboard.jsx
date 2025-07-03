import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function ValidatorDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard Validator</h1>
        <p>Selamat datang, {user?.name}</p>
        {/* Tambahkan daftar pengajuan dan tombol validasi */}
      </div>
    </>
  );
}

