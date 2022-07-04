import { ICreateCommentDTO } from "@modules/posts/dtos/ICreateCommentDTO";
import { Comment } from "@modules/posts/entities/Comment";
import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { CreateCommentError } from "./CreateCommentError";
import { CreateCommentSchema } from "./CreateCommentSchema";

@injectable()
export class CreateCommentUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({
    user_id,
    post_id,
    commentary,
  }: ICreateCommentDTO): Promise<Comment> {
    const schema = new CreateCommentSchema();

    await schema.validate({ commentary });

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new CreateCommentError.PostNotFound();
    }

    const comment = await this.commentsRepository.create({
      user_id,
      post_id,
      commentary,
    });

    return comment;
  }
}
