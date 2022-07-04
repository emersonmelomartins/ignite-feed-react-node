import { Post } from "@modules/posts/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";
import { GetPostError } from "./GetPostError";

interface IRequest {
  post_id: string;
}

@injectable()
export class GetPostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({ post_id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new GetPostError.NotFound();
    }

    return post;
  }
}
