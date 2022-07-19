import {
  IPost,
  IRequestContentWithExtension,
} from "../../interfaces/posts/IPost";
import { api } from "../api";

const route = "/posts";

export function GetAllPosts() {
  return api.get<IPost[]>(`${route}`);
}

export function CreatePost(content: IRequestContentWithExtension[]) {
  return api.post<void>(`${route}`, {
    content,
  });
}
