import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  type User,
} from "firebase/auth";
import { auth } from "../firebase";
import type { AppData, Biodata, Project } from "../types";

const defaultBiodata: Biodata = {
  name: "Hari Parasar",
  photo: "/images/owner.jpg",
  tagline: "Full Stack Developer & App Creator",
  about:
    "Main ek passionate developer hoon jo pichle kai saalon se web aur mobile apps bana raha hoon. Mujhe nayi technology seekhna aur creative problems solve karna pasand hai. Is site par aapko meri saari banayi hui apps aur websites milengi.",
  email: "hari@example.com",
  phone: "+91 98765 43210",
  location: "India",
  dob: "15 August 1998",
  skills: ["React", "TypeScript", "Node.js", "React Native", "Python", "MongoDB", "Tailwind CSS", "Firebase"],
  education: "B.Tech in Computer Science",
  experience: "4+ Years in Software Development",
  socials: [
    { platform: "GitHub", url: "https://github.com/" },
    { platform: "LinkedIn", url: "https://linkedin.com/" },
    { platform: "Twitter", url: "https://twitter.com/" },
  ],
};

const defaultProjects: Project[] = [
  {
    id: "p1",
    title: "Task Manager Pro",
    description: "Ek modern task management app jo productivity badhane mein madad karta hai.",
    type: "App",
    link: "https://example.com/taskmanager",
    year: "2024",
    tags: ["React Native", "Firebase"],
  },
  {
    id: "p2",
    title: "E-Commerce Website",
    description: "Full-featured online shopping platform with payment integration.",
    type: "Website",
    link: "https://example.com/shop",
    year: "2023",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    id: "p3",
    title: "Chat Messenger",
    description: "Real-time chat application with voice and video calling support.",
    type: "App",
    link: "https://example.com/chat",
    year: "2023",
    tags: ["Socket.io", "WebRTC"],
  },
];

const STORAGE_KEY = "portfolio_app_data_v1";

interface AppContextType {
  data: AppData;
  isOwner: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateBiodata: (b: Biodata) => void;
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  changePassword: (newPass: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { biodata: defaultBiodata, projects: defaultProjects };
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsOwner(!!user);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const changePassword = async (newPass: string): Promise<boolean> => {
    try {
      if (currentUser) {
        await updatePassword(currentUser, newPass);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Change password error:", error);
      return false;
    }
  };

  const updateBiodata = (b: Biodata) => {
    setData((d) => ({ ...d, biodata: b }));
  };

  const addProject = (p: Omit<Project, "id">) => {
    const newP: Project = { ...p, id: `p_${Date.now()}` };
    setData((d) => ({ ...d, projects: [newP, ...d.projects] }));
  };

  const updateProject = (id: string, p: Partial<Project>) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((pr) => (pr.id === id ? { ...pr, ...p } : pr)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
  };

  return (
    <AppContext.Provider
      value={{ data, isOwner, currentUser, login, logout, updateBiodata, addProject, updateProject, deleteProject, changePassword }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
