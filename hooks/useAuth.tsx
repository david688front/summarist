import { auth } from "@/firebase";
import { modalClose } from "@/redux/modalSlice";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  guestSignIn: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  guestSignIn: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);

        const redirectPath =
          pathname === "" || pathname === "/" ? "/for-you" : pathname;
        router.push(redirectPath);
        setLoading(false);
        dispatch(modalClose());

      })
      .catch((error) => setError(error.message.replace("Firebase: ", "")))
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        const redirectPath =
          pathname === "" || pathname === "/" ? "/for-you" : pathname;
        router.push(redirectPath);
        setLoading(false);
        dispatch(modalClose());
      })
      .catch((error) => setError(error.message.replace("Firebase: ", "")))
      .finally(() => {
        setLoading(false);
      });
  };

  const guestSignIn = async () => {
    setLoading(true);

    await signInAnonymously(auth)
      .then((userCredential) => {
        setUser(userCredential.user);
        const redirectPath =
          pathname === "" || pathname === "/" ? "/for-you" : pathname;
        router.push(redirectPath);
        setLoading(false);
        dispatch(modalClose());
      })
      .catch((error) => setError(error.message.replace("Firebase: ", "")))
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => setError(error.message.replace("Firebase: ", "")))
      .finally(() => {
        setLoading(false);
        dispatch(modalClose());
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      guestSignIn,
      loading,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}