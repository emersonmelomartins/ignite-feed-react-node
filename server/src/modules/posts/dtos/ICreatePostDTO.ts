import { Content } from "../entities/Content";

export interface ICreatePostDTO {
  id?: string;
  user_id: string;
  content: Content[];
}
