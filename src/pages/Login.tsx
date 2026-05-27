import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login, isOwner } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isOwner) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("ACCESS DENIED — Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="w-full max-w-md animate-slide-up">
        <div className="relative group">
          {/* Glow border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-500/40 via-transparent to-violet-500/40 opacity-60 blur-[2px]" />

          {/* Card */}
          <div className="relative rounded-3xl bg-[#0a0a1a]/95 backdrop-blur-xl border border-cyan-500/25 p-8">
            {/* Scanline overlay */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scanline" />
            </div>

            {/* Header */}
            <div className="text-center mb-8 relative">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-3xl">
                  🔐
                </div>
                {/* Holographic ring */}
                <div className="absolute -inset-2 rounded-2xl border border-cyan-400/20 animate-spin-slow" style={{ animationDuration: "8s" }} />
              </div>
              <h1 className="text-2xl font-bold text-cyan-100 font-mono tracking-wide">
                &gt; OWNER_LOGIN
              </h1>
              <p className="text-cyan-400/50 text-xs mt-2 font-mono tracking-wider">
                Enter credentials to access J.A.R.V.I.S system
              </p>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mt-4" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 relative">
              <div>
                <label className="block text-[10px] text-cyan-400/50 tracking-[0.2em] uppercase mb-2 font-mono">
                  &gt; EMAIL
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="data-input"
                  placeholder="Enter email..."
                />
              </div>

              <div>
                <label className="block text-[10px] text-cyan-400/50 tracking-[0.2em] uppercase mb-2 font-mono">
                  &gt; PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="data-input"
                  placeholder="Enter password..."
                />
              </div>

              {/* Status indicators */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                <div className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-amber-400 animate-pulse" : "bg-cyan-400/50"}`} />
                <span className="text-[10px] text-cyan-400/40 font-mono tracking-wider">
                  {loading ? "AUTHENTICATING..." : "AWAITING_INPUT"}
                </span>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-red-300/80 text-xs font-mono tracking-wide">
                    ⚠ {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-3.5 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 to-blue-500 transition-opacity duration-300" />
                <span className="relative text-white text-sm font-mono tracking-wider flex items-center justify-center gap-3">
                  <span className="w-4 h-[1px] bg-white/30" />
                  {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
                  <span className="w-4 h-[1px] bg-white/30" />
                </span>
              </button>
            </form>

            {/* Info box */}
            <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-cyan-400/30">🔒</span>
                <span className="text-[10px] text-cyan-400/40 tracking-wider font-mono">SECURE_LOGIN</span>
              </div>
              <p className="text-cyan-400/40 text-[10px] font-sans italic">
                Login with your Firebase email and password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
