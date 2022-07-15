import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}
  async execute({ content, user_id }: ICreatePostDTO) {

    const post = await this.postsRepository.create({
      content,
      user_id,
    });

    return post;
  }
}
