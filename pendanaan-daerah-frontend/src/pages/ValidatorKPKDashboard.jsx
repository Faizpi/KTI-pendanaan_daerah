import React from 'react';

export default function ValidatorKPKDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Validator - KPK</h1>
      <p className="mb-4">Selamat datang, Validator KPK 👮‍♂️</p>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Validasi Pengajuan</h2>
        <p className="text-gray-500 italic">Belum ada pengajuan yang perlu divalidasi.</p>
      </div>
    </div>
  );
}
