import { IComment } from "../../interfaces/posts/IPost";
import { IRequestComment } from "../../interfaces/posts/IRequestComment";
import { api } from "../api";

const route = "/comments";

export function GetAllCommentsByPost(post_id: string) {
  return api.get<IComment[]>(`${route}/post/${post_id}`);
}

export function CreateComment({ commentary, post_id }: IRequestComment) {
  return api.post<IComment>(`${route}/post/${post_id}`, { commentary });
}

export function GiveCommentLike(comment_id: string) {
  return api.patch<IComment>(`${route}/${comment_id}/like`,);
}

export function DeleteComment(post_id: string, comment_id: string) {
  return api.delete<void>(`${route}/post/${post_id}/${comment_id}`,);
}
