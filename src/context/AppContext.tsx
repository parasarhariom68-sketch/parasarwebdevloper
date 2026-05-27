import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
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

const DOC_PATH = "portfolio/main";

interface AppContextType {
  data: AppData;
  isOwner: boolean;
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateBiodata: (b: Biodata) => Promise<void>;
  addProject: (p: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, p: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  changePassword: (newPass: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>({ biodata: defaultBiodata, projects: defaultProjects });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsOwner(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for Firestore data
  useEffect(() => {
    const docRef = doc(db, DOC_PATH);

    // Pehle check karo data exist karta hai ya nahi
    getDoc(docRef).then((snap) => {
      if (!snap.exists()) {
        // Agar data nahi hai to default save karo
        setDoc(docRef, { biodata: defaultBiodata, projects: defaultProjects });
      }
    });

    // Real-time listener
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setData(snap.data() as AppData);
      }
      setLoading(false);
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

  const saveToFirestore = async (newData: AppData) => {
    try {
      const docRef = doc(db, DOC_PATH);
      await setDoc(docRef, newData);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const updateBiodata = async (b: Biodata) => {
    const newData = { ...data, biodata: b };
    setData(newData);
    await saveToFirestore(newData);
  };

  const addProject = async (p: Omit<Project, "id">) => {
    const newP: Project = { ...p, id: `p_${Date.now()}` };
    const newData = { ...data, projects: [newP, ...data.projects] };
    setData(newData);
    await saveToFirestore(newData);
  };

  const updateProject = async (id: string, p: Partial<Project>) => {
    const newData = {
      ...data,
      projects: data.projects.map((pr) => (pr.id === id ? { ...pr, ...p } : pr)),
    };
    setData(newData);
    await saveToFirestore(newData);
  };

  const deleteProject = async (id: string) => {
    const newData = {
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    };
    setData(newData);
    await saveToFirestore(newData);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        isOwner,
        currentUser,
        loading,
        login,
        logout,
        updateBiodata,
        addProject,
        updateProject,
        deleteProject,
        changePassword,
      }}
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
