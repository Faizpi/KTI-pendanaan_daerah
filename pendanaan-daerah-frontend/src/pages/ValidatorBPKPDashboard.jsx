import React from 'react';

export default function ValidatorBPKPDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Validator - BPKP</h1>
      <p className="mb-4">Selamat datang, Validator BPKP 🕵️‍♀️</p>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Validasi Laporan Tahap</h2>
        <p className="text-gray-500 italic">Belum ada laporan untuk divalidasi.</p>
      </div>
    </div>
  );
}

