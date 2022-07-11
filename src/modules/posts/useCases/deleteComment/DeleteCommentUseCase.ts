import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteCommentUseCase {

  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,

    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}
  
  async execute(post_id: string, comment_id: string, user_id: string): Promise<void> {
    const post = await this.postsRepository.findById(post_id);

    if(!post) {
      throw new AppError("Post not found", 404);
    }

    const comment = await this.commentsRepository.findById(comment_id)

    if(!comment) {
      throw new AppError("Comment not found", 404);
    }

    if(user_id !== comment.user_id) {
      throw new AppError("You must be the author to delete")
    }

    await this.commentsRepository.delete(comment_id);
  }
}