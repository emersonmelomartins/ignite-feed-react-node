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
  ) => Promise<boolean>;
  signed: boolean;
  user: User;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  token: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useSessionStorage("APP::user-info", "");

  async function login(email: string, password: string) {
    const { data } = await api.post("/sessions", {
      email,
      password,
    });

    setUser(data);
  }

  function logout() {
    sessionStorage.clear();
    setUser("");
  }

  async function register(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    await api.post("/users", {
      email,
      password,
      name,
      role,
    });

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        signed: Boolean(user),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
