import { createContext, ReactNode, useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { api } from "../services/api";

interface AuthContextProps {
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: string,
    avatar?: string
  ) => void;
  signed: boolean;
  user: User;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useSessionStorage("APP::user-info", "");

  const [signed, setSigned] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.hasOwnProperty("user") && user.hasOwnProperty("token")) {
        setSigned(true);
      }
    }
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post("/sessions", {
      email,
      password,
    });
    
    setUser(data);
    setSigned(true);
  }

  function logout() {
    sessionStorage.clear();
    setSigned(false);
  }

  function register(
    name: string,
    email: string,
    password: string,
    role: string,
    avatar?: string
  ) {}

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        signed,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
