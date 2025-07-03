import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Kembali ke halaman masyarakat
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Pendanaan Daerah</Link>
      <div>
        {!user ? (
          <Link to="/login" className="bg-white text-blue-800 px-4 py-1 rounded">
            Login
          </Link>
        ) : (
          <>
            <span className="mr-4">👤 {user.name} ({user.role})</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
