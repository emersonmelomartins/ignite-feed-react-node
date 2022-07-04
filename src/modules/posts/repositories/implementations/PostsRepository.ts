import { Repository } from "typeorm";
import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Content, ContentTypeEnum } from "@modules/posts/entities/Content";
import { Post } from "@modules/posts/entities/Post";
import { AppError } from "@shared/errors/AppError";
import { AppDataSource } from "../../../../database";
import { IPostsRepository } from "../IPostsRepository";

interface IResponse {
  id: string;
  user_id: string;
  content: [
    {
      type: ContentTypeEnum;
      value: string;
    }
  ];
}

export class PostsRepository implements IPostsRepository {
  repository: Repository<Post>;

  constructor() {
    this.repository = AppDataSource.getRepository(Post);
  }

  async create({ content, user_id }: ICreatePostDTO): Promise<ICreatePostDTO> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const post = this.repository.create({
        user_id,
      });

      await queryRunner.manager.save(Post, post);

      content.forEach(async (c) => {
        const currentContent = queryRunner.manager.create(Content, {
          post_id: post.id,
          type: c.type,
          value: c.value,
        });

        await queryRunner.manager.save(Content, currentContent);
      });

      await queryRunner.commitTransaction();

      const postResponse: ICreatePostDTO = {
        ...post,
        content,
      };

      return postResponse;
      
    } catch (err) {
      throw new AppError((err as Error).message);
    } finally {
      await queryRunner.release();
    }
  }
  findByUser(id: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
