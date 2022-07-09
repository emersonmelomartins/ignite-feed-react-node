import { User } from "@modules/users/entities/User";
import { Content, ContentTypeEnum } from "../entities/Content";

export interface ICreatePostDTO {
  id?: string;
  user_id: string;
  content: Content[];
}
