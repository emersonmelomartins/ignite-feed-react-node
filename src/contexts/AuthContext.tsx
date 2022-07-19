import { createContext, ReactNode } from "react";
import { CreateUser, GetCurrentUserProfile } from "../services/userService";
import { AuthenticateUser } from "../services/sessionService";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { IRequestSession } from "../interfaces/sessions/IRequestSession";
import { IRequestUser } from "../interfaces/users/IRequestUser";
import { IUser } from "../interfaces/users/IUser";

interface IAuthContextProps {
  login: ({ email, password }: IRequestSession) => Promise<void>;
  logout: () => void;
  register: (data: IRequestUser) => Promise<boolean>;
  refreshUserInfo: () => void;
  signed: boolean;
  user: IUser;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useSessionStorage("APP::user-info", "");

  async function login({ email, password }: IRequestSession): Promise<void> {
    const { data } = await AuthenticateUser({ email, password });

    setUser(data);
  }

  function logout(): void {
    sessionStorage.clear();
    setUser("");
  }

  async function register({
    name,
    email,
    password,
    role,
  }: IRequestUser): Promise<boolean> {
    await CreateUser({ name, email, password, role });

    return true;
  }

  async function refreshUserInfo(): Promise<void> {
    if (!user) return;

    const { data } = await GetCurrentUserProfile();

    const updatedUser = {
      ...data,
      token: user.token,
    };

    setUser(updatedUser);

    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        refreshUserInfo,
        signed: Boolean(user),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
