import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_AUTH from "../services/apiAutch";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API_AUTH.post("/login", form);
      const { user, token } = res.data;

      login({ ...user, token });

      if (user.role === "pemda") navigate("/pemda/dashboard");
      else if (user.role === "validator-kpk") navigate("/validator/kpk");
      else if (user.role === "validator-bpkp") navigate("/validator/bpkp");
      else navigate("/"); // fallback kalau role tidak dikenali

    } catch (err) {
      const message = err?.response?.data?.message || "Terjadi kesalahan saat login";
      alert("Login gagal: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
