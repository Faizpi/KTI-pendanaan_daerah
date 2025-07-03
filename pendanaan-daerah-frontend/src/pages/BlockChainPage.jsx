import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function BlockchainPage() {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const fetchChain = async () => {
      try {
        const res = await API.get("/blockchain");
        setChain(res.data);
      } catch (err) {
        console.error("Gagal fetch blockchain:", err);
      }
    };
    fetchChain();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">📦 Blockchain Log</h1>
        {chain.map((block) => (
          <div key={block.index} className="p-4 mb-4 bg-gray-100 rounded shadow">
            <h2 className="font-semibold text-blue-700">Block #{block.index}</h2>
            <p><strong>Timestamp:</strong> {block.timestamp}</p>
            <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
              {JSON.stringify(block.data, null, 2)}
            </pre>
            <p className="text-xs break-all text-gray-600"><strong>Hash:</strong> {block.hash}</p>
            <p className="text-xs break-all text-gray-600"><strong>Prev:</strong> {block.previousHash}</p>
          </div>
        ))}
      </div>
    </>
  );
}
