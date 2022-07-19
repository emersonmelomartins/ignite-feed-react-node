import { api } from "../api";
import { IRequestSession } from "../../interfaces/sessions/IRequestSession";
import { ISession } from "../../interfaces/sessions/ISession";

const route = "/sessions";

export function AuthenticateUser({ email, password }: IRequestSession) {
  return api.post<ISession>(`${route}`, {
    email,
    password,
  });
}
