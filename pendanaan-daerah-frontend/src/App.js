import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PemdaDashboard from "./pages/PemdaDashboard";
import ValidatorKPKDashboard from "./pages/ValidatorKPKDashboard";
import ValidatorBPKPDashboard from "./pages/ValidatorBPKPDashboard";
import MasyarakatDashboard from "./pages/MasyarakatDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<MasyarakatDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pemda/dashboard" element={<PemdaDashboard />} />
          <Route path="/validator/kpk" element={<ValidatorKPKDashboard />} />
          <Route path="/validator/bpkp" element={<ValidatorBPKPDashboard />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
