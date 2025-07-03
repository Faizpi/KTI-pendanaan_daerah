// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-blue-900">
        Pendanaan Daerah
      </Link>
      <Link to="/blockchain" className="ml-4 hover:underline">
        Lihat Blockchain
      </Link>
      <div className="flex items-center gap-4">
        {!user ? (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Login
          </Link>
        ) : (
          <>
            <div className="text-sm text-gray-700">
              {user.name}{" "}
              <span className="text-gray-500 italic">({user.role})</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
