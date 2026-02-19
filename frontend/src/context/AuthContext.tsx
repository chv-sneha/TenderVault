import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

interface AuthContextType {
  currentUser: User | null;
  accountType: "government" | "contractor" | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, accountType: "government" | "contractor") => Promise<void>;
  googleSignIn: (accountType: "government" | "contractor") => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accountType, setAccountType] = useState<"government" | "contractor" | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (email: string, password: string, name: string, accountType: "government" | "contractor") => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      accountType,
      createdAt: new Date().toISOString(),
    });
    setAccountType(accountType);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async (accountType: "government" | "contractor") => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        accountType,
        createdAt: new Date().toISOString(),
      });
      setAccountType(accountType);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setAccountType(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setAccountType(userDoc.data().accountType);
        }
      } else {
        setAccountType(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    accountType,
    loading,
    login,
    register,
    googleSignIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
