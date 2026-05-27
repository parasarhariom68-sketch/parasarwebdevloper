export interface Project {
  id: string;
  title: string;
  description: string;
  type: "App" | "Website" | "Other";
  link: string;
  year: string;
  tags: string[];
  image?: string;
}

export interface Biodata {
  name: string;
  photo: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  dob: string;
  skills: string[];
  education: string;
  experience: string;
  socials: { platform: string; url: string }[];
}

export interface AppData {
  biodata: Biodata;
  projects: Project[];
}
