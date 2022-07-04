import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";
import { GiveCommentLikeError } from "./GiveCommentLikeError";

@injectable()
export class GiveCommentLikeUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(comment_id: string): Promise<boolean> {
    const comment = await this.commentsRepository.findById(comment_id);

    if (!comment) {
      throw new GiveCommentLikeError.NotFound();
    }

    comment.likes = comment.likes + 1;

    await this.commentsRepository.create(comment);

    return true;
  }
}
