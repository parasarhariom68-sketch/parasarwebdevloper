import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { Biodata, Project } from "../types";

function HolographicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/30 via-transparent to-violet-500/30 opacity-50 group-hover:opacity-80 blur-[2px] transition-all duration-500" />
      <div className="relative rounded-2xl bg-[#0a0a1a]/95 backdrop-blur-xl border border-cyan-500/20 p-6 transition-all duration-500">
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scanline" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { isOwner, logout } = useApp();

  if (!isOwner) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <span className="text-[10px] text-emerald-400/70 tracking-[0.3em] uppercase font-mono">Admin Access Granted</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-100 font-mono tracking-wide">
          &gt; OWNER_DASHBOARD
        </h1>
        <div className="h-[1px] w-40 bg-gradient-to-r from-cyan-400/50 to-transparent mt-3" />
        <p className="text-cyan-400/40 text-xs mt-2 font-mono tracking-wider">
          J.A.R.V.I.S Control Panel — Manage biodata, projects & system settings
        </p>
      </div>

      {/* Logout button */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg text-xs font-mono bg-red-500/10 text-red-300/70 border border-red-500/20 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300 tracking-wider"
        >
          ⏻ TERMINATE_SESSION
        </button>
      </div>

      <div className="space-y-8">
        {/* Biodata Section */}
        <HolographicCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-sm">
              👤
            </div>
            <div>
              <h2 className="text-lg font-bold text-cyan-100 font-mono tracking-wide">&gt; BIODATA_CONFIG</h2>
              <p className="text-[10px] text-cyan-400/40 font-mono tracking-wider">Personal information settings</p>
            </div>
          </div>
          <BiodataEditor />
        </HolographicCard>

        {/* Projects Section */}
        <HolographicCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-sm">
              📦
            </div>
            <div>
              <h2 className="text-lg font-bold text-cyan-100 font-mono tracking-wide">&gt; PROJECT_MANAGER</h2>
              <p className="text-[10px] text-cyan-400/40 font-mono tracking-wider">Add, edit, remove projects</p>
            </div>
          </div>
          <ProjectsEditor />
        </HolographicCard>

        {/* Settings Section */}
        <HolographicCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-sm">
              ⚙
            </div>
            <div>
              <h2 className="text-lg font-bold text-cyan-100 font-mono tracking-wide">&gt; SYSTEM_SETTINGS</h2>
              <p className="text-[10px] text-cyan-400/40 font-mono tracking-wider">Security & configuration</p>
            </div>
          </div>
          <SettingsPanel />
        </HolographicCard>
      </div>
    </div>
  );
}

/* ---- Input Components ---- */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`data-input text-sm ${props.className || ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`data-input text-sm resize-none ${props.className || ""}`}
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] text-cyan-400/50 tracking-[0.2em] uppercase mb-1.5 font-mono">
      {children}
    </label>
  );
}

/* ---- Biodata Editor ---- */

function BiodataEditor() {
  const { data, updateBiodata } = useApp();
  const [form, setForm] = useState<Biodata>(data.biodata);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });

  const save = (e: FormEvent) => {
    e.preventDefault();
    updateBiodata(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm({ ...form, photo: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (s: string) => setForm({ ...form, skills: form.skills.filter((x) => x !== s) });

  const addSocial = () => {
    if (newSocial.platform.trim() && newSocial.url.trim()) {
      setForm({ ...form, socials: [...form.socials, newSocial] });
      setNewSocial({ platform: "", url: "" });
    }
  };

  const removeSocial = (i: number) =>
    setForm({ ...form, socials: form.socials.filter((_, idx) => idx !== i) });

  return (
    <form onSubmit={save} className="space-y-5">
      {/* Photo with file upload */}
      <div className="flex items-center gap-4 pb-5 border-b border-cyan-500/10">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/40 to-blue-600/40 blur-sm" />
          <img
            src={form.photo}
            alt="preview"
            className="relative w-16 h-16 rounded-2xl object-cover border border-cyan-400/30"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230a1628'/%3E%3Ctext x='50' y='60' font-size='40' text-anchor='middle' fill='%2300d4ff'%3E👤%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Photo URL paste karein..."
            value={typeof form.photo === "string" && (form.photo.startsWith("http") || form.photo.startsWith("data:")) ? form.photo : ""}
            onChange={(e) => setForm({ ...form, photo: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
            className="block w-full text-xs text-cyan-400/50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-600/30 file:text-cyan-300 file:text-xs file:font-mono hover:file:bg-cyan-600/40 file:cursor-pointer"
          />
        </div>
      </div>

      {/* Main fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div><Label>Full Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>Tagline</Label><Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></div>
        <div className="md:col-span-2"><Label>About</Label><Textarea rows={3} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} /></div>
        <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
        <div><Label>Date of Birth</Label><Input value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} /></div>
        <div><Label>Education</Label><Input value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} /></div>
        <div><Label>Experience</Label><Input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
      </div>

      {/* Skills */}
      <div className="pb-4 border-b border-cyan-500/10">
        <Label>Skills</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {form.skills.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-200/80 border border-cyan-500/30 text-xs font-mono tracking-wide flex items-center gap-2">
              [{s}]
              <button type="button" onClick={() => removeSkill(s)} className="text-red-300/70 hover:text-red-200 font-bold">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add skill..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
          <button type="button" onClick={addSkill} className="px-4 rounded-xl bg-cyan-600/30 text-cyan-300 text-xs font-mono border border-cyan-500/30 hover:bg-cyan-600/40 shrink-0">ADD</button>
        </div>
      </div>

      {/* Socials */}
      <div className="pb-4 border-b border-cyan-500/10">
        <Label>Social Links</Label>
        {form.socials.map((s, i) => (
          <div key={i} className="flex gap-2 items-center bg-cyan-500/5 rounded-lg p-2 mb-2 border border-cyan-500/10">
            <span className="text-cyan-300/80 font-mono text-xs min-w-[80px] tracking-wide">{s.platform}:</span>
            <span className="text-cyan-400/50 text-xs truncate flex-1 font-mono">{s.url}</span>
            <button type="button" onClick={() => removeSocial(i)} className="px-2 py-1 rounded bg-red-500/20 text-red-300/70 text-[10px] font-mono hover:bg-red-500/30 shrink-0">DEL</button>
          </div>
        ))}
        <div className="grid md:grid-cols-[1fr_2fr_auto] gap-2">
          <Input placeholder="Platform" value={newSocial.platform} onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })} />
          <Input placeholder="URL" value={newSocial.url} onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })} />
          <button type="button" onClick={addSocial} className="px-4 rounded-xl bg-cyan-600/30 text-cyan-300 text-xs font-mono border border-cyan-500/30 hover:bg-cyan-600/40 shrink-0">ADD</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="group relative px-6 py-3 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600" />
          <span className="relative text-white text-xs font-mono tracking-wider flex items-center gap-2">
            <span className="text-cyan-200">◈</span> SAVE_BIODATA
          </span>
        </button>
        {saved && (
          <span className="text-emerald-400/80 text-xs font-mono tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SAVED
          </span>
        )}
      </div>
    </form>
  );
}

/* ---- Projects Editor ---- */

function ProjectsEditor() {
  const { data, addProject, updateProject, deleteProject } = useApp();
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProject: Omit<Project, "id"> = {
    title: "",
    description: "",
    type: "App",
    link: "",
    year: new Date().getFullYear().toString(),
    tags: [],
  };

  const startAdd = () => {
    setEditing({ ...emptyProject, id: "new" } as Project);
    setShowForm(true);
  };

  const startEdit = (p: Project) => {
    setEditing(p);
    setShowForm(true);
  };

  const handleSave = (p: Project) => {
    if (p.id === "new") {
      const { id: _id, ...rest } = p;
      addProject(rest);
    } else {
      updateProject(p.id, p);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Project delete karna chahte hain?")) {
      deleteProject(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-cyan-400/40 font-mono tracking-wider">
            ENTRIES: <span className="text-cyan-200">{data.projects.length}</span>
          </span>
        </div>
        <button onClick={startAdd} className="group relative px-5 py-2.5 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600" />
          <span className="relative text-white text-xs font-mono tracking-wider flex items-center gap-2">
            + ADD_PROJECT
          </span>
        </button>
      </div>

      {showForm && editing && (
        <ProjectForm project={editing} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {data.projects.map((p) => (
          <div
            key={p.id}
            className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 flex items-start justify-between gap-3 group hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{p.type === "App" ? "📱" : p.type === "Website" ? "🌐" : "⚡"}</span>
                <h3 className="text-cyan-100 font-bold font-mono text-sm tracking-wide truncate">&gt; {p.title}</h3>
              </div>
              <p className="text-cyan-400/40 text-[10px] font-mono mb-1">
                [{p.year}] {p.tags.map((t) => `#${t}`).join(" ")}
              </p>
              <p className="text-cyan-300/50 text-xs leading-relaxed line-clamp-2">{p.description}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => startEdit(p)} className="px-2.5 py-1 rounded bg-cyan-600/20 text-cyan-300/70 text-[10px] font-mono hover:bg-cyan-600/30">EDIT</button>
              <button onClick={() => handleDelete(p.id)} className="px-2.5 py-1 rounded bg-red-500/20 text-red-300/70 text-[10px] font-mono hover:bg-red-500/30">DEL</button>
            </div>
          </div>
        ))}
        {data.projects.length === 0 && (
          <div className="md:col-span-2 text-center py-10 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
            <p className="text-cyan-400/40 font-mono text-xs tracking-wider">
              &gt; NO PROJECTS FOUND
            </p>
            <p className="text-cyan-400/30 text-[10px] font-mono mt-1">
              Use "ADD_PROJECT" to create a new entry
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: { project: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Project>(project);
  const [tagInput, setTagInput] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  return (
    <form onSubmit={submit} className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5 mb-5 space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-cyan-300 text-sm">{form.id === "new" ? "➕" : "✏️"}</span>
        <h3 className="text-cyan-100 font-bold font-mono text-sm tracking-wide">
          {form.id === "new" ? "&gt; ADD_PROJECT" : "&gt; EDIT_PROJECT"}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div><Label>Link (URL)</Label><Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></div>
        <div>
          <Label>Type</Label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as Project["type"] })}
            className="data-input text-sm"
          >
            <option value="App" className="bg-[#0a0a1a]">App</option>
            <option value="Website" className="bg-[#0a0a1a]">Website</option>
            <option value="Other" className="bg-[#0a0a1a]">Other</option>
          </select>
        </div>
        <div><Label>Year</Label><Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></div>
      </div>
      <div><Label>Description</Label><Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
      <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.tags.map((t) => (
            <span key={t} className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300/70 text-[10px] font-mono flex items-center gap-1 border border-cyan-500/20">
              #{t}
              <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })} className="text-red-300/70">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add tag..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
          <button type="button" onClick={addTag} className="px-3 rounded-xl bg-cyan-600/30 text-cyan-300 text-xs font-mono border border-cyan-500/30 shrink-0">+</button>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-600/40 text-cyan-100 text-xs font-mono border border-cyan-500/30 hover:bg-cyan-600/50 transition-all">SAVE</button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-xl bg-white/5 text-cyan-300/50 text-xs font-mono border border-cyan-500/20 hover:bg-white/10 transition-all">CANCEL</button>
      </div>
    </form>
  );
}

/* ---- Settings Panel ---- */

function SettingsPanel() {
  const { changePassword, logout } = useApp();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (newPass.length < 4) {
      setMsg("❌ Password kam se kam 4 characters ka hona chahiye");
      return;
    }
    if (newPass !== confirmPass) {
      setMsg("❌ Dono password match nahi karte");
      return;
    }
    changePassword(newPass);
    setMsg("✅ Password change ho gaya! Dobara login karna hoga.");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => logout(), 1500);
  };

  return (
    <div className="max-w-lg">
      <h3 className="text-cyan-100 font-semibold mb-4 font-mono text-sm tracking-wide flex items-center gap-2">
        <span className="text-cyan-400">🔑</span> CHANGE_PASSWORD
      </h3>
      <form onSubmit={handleSave} className="space-y-3">
        <div><Label>New Password</Label><Input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required /></div>
        <div><Label>Confirm Password</Label><Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required /></div>
        {msg && (
          <div className={`p-3 rounded-xl text-xs font-mono ${msg.startsWith("✅") ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300/80" : "bg-red-500/10 border border-red-500/20 text-red-300/80"}`}>
            {msg}
          </div>
        )}
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-cyan-600/40 text-cyan-100 text-xs font-mono border border-cyan-500/30 hover:bg-cyan-600/50 transition-all">
          UPDATE
        </button>
      </form>

      <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-cyan-400/30">💡</span>
          <span className="text-[10px] text-cyan-400/40 tracking-wider font-mono">SYSTEM_NOTE</span>
        </div>
        <p className="text-cyan-400/30 text-[10px] font-mono leading-relaxed">
          Saari data aapke browser ke localStorage mein save hoti hai. Cache clear karne se data reset ho jayega.
        </p>
      </div>
    </div>
  );
}
