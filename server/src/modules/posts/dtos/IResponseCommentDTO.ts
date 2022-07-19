import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";

export interface IResponseCommentDTO {
  id?: string;
  likes: number;
  commentary: string;
  created_at: Date;
  user: IUserResponseDTO;
}
