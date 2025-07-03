import React from 'react';

export default function PemdaDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Pemerintah Daerah</h1>
      <p className="mb-4">Selamat datang, Pemda Tangerang 👋</p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Ajukan Pendanaan</h2>
          <form className="space-y-2">
            <input type="text" placeholder="Nama Proyek" className="border w-full p-2 rounded" />
            <input type="number" placeholder="Tahap Ke-" className="border w-full p-2 rounded" />
            <input type="file" className="border w-full p-2 rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Kirim</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Riwayat Pengajuan</h2>
          <p className="text-gray-500 italic">Belum ada pengajuan...</p>
        </div>
      </div>
    </div>
  );
}
