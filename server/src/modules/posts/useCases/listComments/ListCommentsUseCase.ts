import { Comment } from "@modules/posts/entities/Comment";
import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IResponse {
  id: string;
  commentary: string;
  likes: number;
  post_id: string;
  created_at: Date;
  user: IUserResponseDTO;
}

@injectable()
export class ListCommentsUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(post_id: string): Promise<IResponse[]> {
    const comments = await this.commentsRepository.findByPostId(post_id);

    if (!comments) {
      throw new AppError("Post not found");
    }

    const res: IResponse[] = comments.map((c) => {
      const user = UserMap.toDTO(c.user);
      return {
        ...c,
        user,
      };
    });

    return res;
  }
}
