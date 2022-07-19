import { ICreateCommentDTO } from "@modules/posts/dtos/ICreateCommentDTO";
import { IResponseCommentDTO } from "@modules/posts/dtos/IResponseCommentDTO";
import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { UserMap } from "@modules/users/mapper/UserMap";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { CreateCommentError } from "./CreateCommentError";
import { CreateCommentSchema } from "./CreateCommentSchema";

@injectable()
export class CreateCommentUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    post_id,
    commentary,
  }: ICreateCommentDTO): Promise<IResponseCommentDTO> {
    const schema = new CreateCommentSchema();

    await schema.validate({ commentary });

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new CreateCommentError.PostNotFound();
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CreateCommentError.UserNotFound();
    }

    const { id, created_at, likes } = await this.commentsRepository.create({
      user_id,
      post_id,
      commentary,
    });

    const response: IResponseCommentDTO = {
      id,
      commentary,
      created_at,
      likes,
      user: UserMap.toDTO(user),
    };

    return response;
  }
}
