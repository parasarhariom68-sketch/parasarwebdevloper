import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { isOwner, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [glitchText, setGlitchText] = useState("INITIALIZING");

  useEffect(() => {
    const msgs = ["INITIALIZING", "SYSTEM ACTIVE", "PARASAR ONLINE", "READY"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % msgs.length;
      setGlitchText(msgs[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.15)]"
        : "text-cyan-200/60 hover:text-cyan-200 border border-transparent hover:border-cyan-500/20"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050510]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_30px_rgba(0,212,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo with HP icon */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border border-cyan-400/40 group-hover:border-cyan-300/60 transition-all duration-300" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 animate-hologram" />
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src="/images/hp-logo.png"
                alt="HP"
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerText = "HP";
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                HP
              </span>
            </div>
            <div className="absolute -inset-1 rounded-xl bg-cyan-400/10 blur-sm group-hover:bg-cyan-400/20 transition-all duration-300" />
          </div>
          <div>
            <span className="text-base font-bold text-cyan-100 tracking-wider">
              HARI PARASAR
            </span>
            <span className="block text-[8px] text-cyan-500/60 tracking-[0.3em] uppercase">
              {glitchText}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/" className={linkClass("/")}>
            <span className="hidden sm:inline">HOME</span>
            <span className="sm:hidden">⌂</span>
          </Link>

          {isOwner ? (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                <span className="hidden sm:inline">DASHBOARD</span>
                <span className="sm:hidden">⚙</span>
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-300/80 border border-red-500/20 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300"
              >
                <span className="hidden sm:inline">LOGOUT</span>
                <span className="sm:hidden">⏻</span>
              </button>
            </>
          ) : (
            <Link to="/login" className={linkClass("/login")}>
              <span className="hidden sm:inline">LOGIN</span>
              <span className="sm:hidden">🔐</span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`} style={{
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
      }} />
    </nav>
  );
}
