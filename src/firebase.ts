import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBg9KX8aSg8NtlcSPp_IyBP9osWzq4RslQ",
  authDomain: "parasar-portfolio.firebaseapp.com",
  projectId: "parasar-portfolio",
  storageBucket: "parasar-portfolio.firebasestorage.app",
  messagingSenderId: "457946542244",
  appId: "1:457946542244:web:26e5fa6aeee2640d4ff631"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
