import { useApp } from "../context/AppContext";
import type { Project } from "../types";

function HolographicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/40 via-transparent to-violet-500/40 opacity-0 group-hover:opacity-100 blur-[2px] transition-all duration-500" />
      {/* Card */}
      <div className="relative rounded-2xl bg-[#0a0a1a]/90 backdrop-blur-xl border border-cyan-500/20 group-hover:border-cyan-400/40 p-6 transition-all duration-500 h-full">
        {/* Scanline overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scanline" />
        </div>
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const typeIcons = { App: "📱", Website: "🌐", Other: "⚡" };

  return (
    <HolographicCard>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-2xl">
          {typeIcons[p.type]}
        </div>
        <span className="text-xs font-mono text-cyan-400/60 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
          {p.year}
        </span>
      </div>
      <h3 className="text-lg font-bold text-cyan-100 mb-2 group-hover:text-cyan-300 transition-colors font-mono tracking-wide">
        &gt; {p.title}
      </h3>
      <p className="text-cyan-200/50 text-sm mb-4 leading-relaxed font-sans">
        {p.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300/70 border border-cyan-500/20 font-mono tracking-wide"
          >
            #{t}
          </span>
        ))}
      </div>
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono tracking-wide group/link"
        >
          <span className="w-4 h-[1px] bg-cyan-400 group-hover/link:w-6 transition-all duration-300" />
          ACCESS_PROJECT
          <span className="text-xs">↗</span>
        </a>
      )}
    </HolographicCard>
  );
}

function RadarGrid() {
  return (
    <div className="relative w-64 h-64 mx-auto mb-8">
      {/* Radar rings */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-cyan-500/10"
          style={{ transform: `scale(${i * 0.25})` }}
        />
      ))}
      {/* Rotating line */}
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "8s" }}>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent origin-left" />
      </div>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,212,255,0.6)] animate-pulse-glow" />
      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-cyan-400/40 animate-radar" />
    </div>
  );
}

export default function Home() {
  const { data } = useApp();
  const { biodata, projects } = data;

  const apps = projects.filter((p) => p.type === "App");
  const websites = projects.filter((p) => p.type === "Website");
  const others = projects.filter((p) => p.type === "Other");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Top ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="max-w-6xl mx-auto px-4">
          {/* Status bar */}
          <div className="flex items-center gap-3 mb-10 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <span className="text-[10px] text-emerald-400/70 tracking-[0.3em] uppercase">System Online</span>
            <span className="text-cyan-500/30 mx-2">|</span>
            <span className="text-[10px] text-cyan-400/50 tracking-[0.2em] font-mono">
              v{new Date().getFullYear()}.{new Date().getMonth() + 1}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo with holographic frame */}
            <div className="relative animate-slide-up group">
              {/* Outer rings */}
              <div className="absolute -inset-6 rounded-full border border-cyan-500/20 animate-spin-slow" style={{ animationDuration: "20s" }} />
              <div className="absolute -inset-10 rounded-full border border-cyan-500/10 animate-spin-slow" style={{ animationDuration: "30s", animationDirection: "reverse" }} />

              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 blur-2xl animate-pulse-glow" />

              {/* Photo */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(0,212,255,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent z-10" />
                <img
                  src={biodata.photo}
                  alt={biodata.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230a1628'/%3E%3Ctext x='50' y='60' font-size='40' text-anchor='middle' fill='%2300d4ff'%3E👤%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Scanline */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scanline" />
                </div>
              </div>

              {/* Status ring */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#050510]/90 border border-cyan-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                  <span className="text-[10px] text-cyan-300/70 tracking-wider font-mono">IDENTITY CONFIRMED</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="animate-slide-up-delay-1">
                <p className="text-[10px] text-cyan-400/60 tracking-[0.3em] uppercase mb-2 font-mono">
                  &gt; SCANNING BIOMETRICS...
                </p>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-text-shimmer">
                    {biodata.name}
                  </span>
                </h1>
                <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 to-transparent mt-3 mx-auto md:mx-0" />
              </div>

              <p className="text-lg md:text-xl text-cyan-200/70 font-mono tracking-wide animate-slide-up-delay-2">
                &gt;&gt; {biodata.tagline}
              </p>

              <p className="text-sm text-cyan-200/40 max-w-lg leading-relaxed animate-slide-up-delay-3 font-sans">
                {biodata.about}
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-slide-up-delay-4">
                <a
                  href={`mailto:${biodata.email}`}
                  className="group relative px-6 py-3 rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 to-blue-500 transition-opacity duration-300" />
                  <span className="relative text-white text-sm font-mono tracking-wider flex items-center gap-2">
                    <span>◈</span> CONTACT_ME
                  </span>
                </a>
                <a
                  href="#projects"
                  className="group relative px-6 py-3 rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-300" />
                  <span className="relative text-cyan-200 text-sm font-mono tracking-wider flex items-center gap-2">
                    <span className="text-cyan-400">⌘</span> VIEW_PROJECTS
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Radar */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-[1px] bg-cyan-400/50" />
          <h2 className="text-lg font-bold text-cyan-100 tracking-[0.2em] uppercase font-mono">
            &gt; BIO_DATA
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/20 to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* About text */}
          <div className="md:col-span-2">
            <HolographicCard>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-cyan-500/40" />
                  ))}
                </div>
                <span className="text-[10px] text-cyan-400/40 tracking-wider font-mono ml-2">
                  PROFILE_DETAILS.exe
                </span>
              </div>
              <p className="text-cyan-200/60 leading-relaxed font-sans">
                {biodata.about}
              </p>
            </HolographicCard>
          </div>

          {/* Info panel */}
          <div className="space-y-3">
            <HolographicCard>
              <RadarGrid />
              <div className="space-y-2 -mt-4">
                <InfoRow label="EMAIL" value={biodata.email} />
                <InfoRow label="PHONE" value={biodata.phone} />
                <InfoRow label="LOCATION" value={biodata.location} />
                <InfoRow label="DOB" value={biodata.dob} />
              </div>
            </HolographicCard>
          </div>
        </div>
      </section>

      {/* Skills & Experience */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-[1px] bg-cyan-400/50" />
          <h2 className="text-lg font-bold text-cyan-100 tracking-[0.2em] uppercase font-mono">
            &gt; SYSTEM_SPECS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/20 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <HolographicCard>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-cyan-300 text-sm">⌨</span>
              <span className="text-[10px] text-cyan-400/40 tracking-wider font-mono">EDUCATION / EXPERIENCE</span>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-cyan-500/50 tracking-wider font-mono block mb-1">ACADEMIC_STATUS</span>
                <p className="text-cyan-100 font-mono text-sm">{biodata.education}</p>
              </div>
              <div className="h-[1px] bg-gradient-to-r from-cyan-500/20 to-transparent" />
              <div>
                <span className="text-[10px] text-cyan-500/50 tracking-wider font-mono block mb-1">EXPERIENCE_LEVEL</span>
                <p className="text-cyan-100 font-mono text-sm">{biodata.experience}</p>
              </div>
            </div>
          </HolographicCard>

          <HolographicCard>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-cyan-300 text-sm">⚙</span>
              <span className="text-[10px] text-cyan-400/40 tracking-wider font-mono">SKILL_MATRIX</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {biodata.skills.map((s, i) => (
                <span
                  key={s}
                  className="group/skill px-3 py-1.5 rounded-lg border text-sm font-mono tracking-wide transition-all duration-300"
                  style={{
                    borderColor: `rgba(0, ${180 + i * 20}, 255, 0.3)`,
                    background: `rgba(0, ${180 + i * 20}, 255, 0.08)`,
                    color: `rgba(0, ${200 + i * 15}, 255, 0.8)`,
                  }}
                >
                  [{s}]
                </span>
              ))}
            </div>
          </HolographicCard>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-[1px] bg-cyan-400/50" />
          <h2 className="text-lg font-bold text-cyan-100 tracking-[0.2em] uppercase font-mono">
            &gt; PROJECT_DATABASE
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/20 to-transparent" />
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-3 rounded-sm bg-cyan-400/30 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <span className="text-[10px] text-cyan-400/50 tracking-wider font-mono">
              TOTAL_ENTRIES: {projects.length}
            </span>
          </div>
        </div>

        {projects.length === 0 ? (
          <HolographicCard>
            <div className="text-center py-8">
              <p className="text-cyan-400/50 font-mono text-sm tracking-wide">
                &gt; NO PROJECTS FOUND IN DATABASE
              </p>
              <p className="text-cyan-400/30 text-xs mt-2 font-mono">
                // Awaiting data upload...
              </p>
            </div>
          </HolographicCard>
        ) : (
          <div className="space-y-10">
            {apps.length > 0 && (
              <div>
                <h3 className="text-sm text-cyan-300/70 font-mono tracking-wider mb-4 flex items-center gap-3">
                  <span className="text-base">📱</span>
                  <span>MOBILE_APPS</span>
                  <span className="text-[10px] text-cyan-500/40">({apps.length})</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {apps.map((p) => <ProjectCard key={p.id} p={p} />)}
                </div>
              </div>
            )}
            {websites.length > 0 && (
              <div>
                <h3 className="text-sm text-cyan-300/70 font-mono tracking-wider mb-4 flex items-center gap-3">
                  <span className="text-base">🌐</span>
                  <span>WEBSITES</span>
                  <span className="text-[10px] text-cyan-500/40">({websites.length})</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {websites.map((p) => <ProjectCard key={p.id} p={p} />)}
                </div>
              </div>
            )}
            {others.length > 0 && (
              <div>
                <h3 className="text-sm text-cyan-300/70 font-mono tracking-wider mb-4 flex items-center gap-3">
                  <span className="text-base">⚡</span>
                  <span>OTHER_PROJECTS</span>
                  <span className="text-[10px] text-cyan-500/40">({others.length})</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {others.map((p) => <ProjectCard key={p.id} p={p} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Socials */}
      {biodata.socials.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-cyan-400/50" />
            <h2 className="text-lg font-bold text-cyan-100 tracking-[0.2em] uppercase font-mono">
              &gt; CONNECT_NETWORK
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/20 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-3">
            {biodata.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group relative px-5 py-3 rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
                <span className="relative text-cyan-200/80 font-mono text-sm tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400/50" />
                  {s.platform}
                  <span className="text-[10px] text-cyan-400/40">↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              <span className="text-[10px] text-emerald-400/60 tracking-wider font-mono">SYSTEM ACTIVE</span>
            </div>
            <p className="text-cyan-500/30 text-xs font-mono tracking-wider">
              © {new Date().getFullYear()} {biodata.name} — ALL RIGHTS RESERVED
            </p>
            <p className="text-cyan-500/20 text-[10px] font-mono">
              &gt; BUILT WITH PARASAR CORE v2.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
      <div>
        <p className="text-[8px] text-cyan-400/40 tracking-[0.2em] uppercase font-mono">{label}</p>
        <p className="text-cyan-100 text-xs font-mono tracking-wide truncate">{value}</p>
      </div>
    </div>
  );
}
