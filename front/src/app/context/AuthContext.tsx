"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export const LOCAL_STORAGE_AUTH_KEY = "auth";

export interface Auth {
  token: string;
}

export interface AuthContextData {
  auth: Auth | null;
  updateAuth: (auth: Auth | null) => void;
}

export const AuthContext = createContext<AuthContextData>({
  auth: null,
  updateAuth: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  const updateAuth = async (auth: Auth | null) => {
    if (!auth) {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    } else {
      try {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(auth));
      } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      }
    }

    setAuth(auth);
  };

  const fetchAuthData = async () => {
    try {
      const authStr = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

      if (!authStr) {
        updateAuth(null);
        return;
      }

      try {
        const value: Auth = JSON.parse(authStr);

        if (value) {
          updateAuth(value);
        } else {
          updateAuth(null);
        }
      } catch (err) {
        console.error(err);
        updateAuth(null);
      }
    } catch (err) {
      console.error(err);
      updateAuth(null);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
