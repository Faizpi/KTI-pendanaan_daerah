// src/components/DashboardWrapper.jsx
import Navbar from "./Navbar";

export default function DashboardWrapper({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </>
  );
}
