import { Comment } from "@modules/posts/entities/Comment";
import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCommentsUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(post_id: string): Promise<Comment[]> {
    const comments = await this.commentsRepository.findByPostId(post_id);

    if(!comments) {
      throw new AppError("Post not found")
    }
    
    return comments;
  }
}
