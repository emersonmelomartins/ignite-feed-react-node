import { IRequestUpdateUserData } from "../../interfaces/users/IRequestUpdateUserData";
import { IRequestUser } from "../../interfaces/users/IRequestUser";
import { IUser } from "../../interfaces/users/IUser";
import { api } from "../api";

const route = "/users";

export function CreateUser({ email, password, name, role }: IRequestUser) {
  return api.post<IUser>(`${route}`, {
    email,
    password,
    name,
    role,
  });
}

export function GetCurrentUserProfile() {
  return api.get<IUser>(`${route}/profile`);
}

export function UpdateCurrentUserAvatar(formData: FormData) {
  return api.patch<void>(`${route}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function UpdateCurrentUserData(data: IRequestUpdateUserData) {
  return api.put<void>(`${route}/personal`, data);
}
