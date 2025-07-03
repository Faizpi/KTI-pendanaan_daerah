import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "pemda" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Register berhasil. Data: " + JSON.stringify(form));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="pemda">Pemerintah Daerah</option>
          <option value="validator">Validator</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
}

