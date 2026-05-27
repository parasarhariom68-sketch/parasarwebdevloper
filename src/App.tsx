import { HashRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid overlay */}
      <div className="absolute inset-0 jarvis-grid opacity-40" />

      {/* Animated particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(0, ${180 + Math.random() * 75}, 255, ${0.3 + Math.random() * 0.4})`,
            boxShadow: `0 0 6px rgba(0, ${180 + Math.random() * 75}, 255, 0.5)`,
            left: `${Math.random() * 100}%`,
            top: `${80 + Math.random() * 20}%`,
            animation: `float-particle ${10 + Math.random() * 20}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
          }}
        />
      ))}

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />

      {/* Holographic lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0L40 11.5v23L20 46L0 34.5v-23z" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#050510] text-white font-mono">
          <ParticleField />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </HashRouter>
    </AppProvider>
  );
}
