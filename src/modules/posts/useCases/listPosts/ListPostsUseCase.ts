import { Post } from "@modules/posts/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute(): Promise<Post[]> {
    const posts = await this.postsRepository.list();

    return posts;
  }
}
