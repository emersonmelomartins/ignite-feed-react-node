import { IUser } from "../users/IUser";

export interface IPost {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  content: IContent[];
  comments: IComment[];
  user: IUser;
}

export interface IContent {
  id: string;
  post_id: string;
  type: "paragraph" | "link";
  value: string;
  order: number;
}

export interface IRequestContentWithExtension extends Omit<IContent, "post_id"> {
  isEditing: boolean;
}

export interface IComment {
  id?: string;
  likes: number;
  commentary: string;
  created_at: string;
  user: IUser;
}