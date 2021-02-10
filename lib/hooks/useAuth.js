import { auth, firebase } from "@/lib/firebase-client";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const retrieveUserData = async (user) => {
    const jwt = await user.getIdToken();
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      jwt
    };
  };

  const checkUser = async (userCred) => {
    try {
      const userData = await retrieveUserData(userCred);

      setUser(userData);
      setLoading(false);
      return userData;
    } catch (err) {
      setUser(false);
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userData = await auth.signInWithEmailAndPassword(email, password);
      return await checkUser(userData);
    } catch (err) {
      return "Wrong credentials";
    }
  };

  const signOut = async () => {
    return await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(checkUser);

    return () => unsubscribe();
  }, []);

  return { user, signIn, loading, signOut };
};
