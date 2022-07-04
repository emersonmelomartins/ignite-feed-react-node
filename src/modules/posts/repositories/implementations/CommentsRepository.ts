import { ICreateCommentDTO } from "@modules/posts/dtos/ICreateCommentDTO";
import { Comment } from "@modules/posts/entities/Comment";
import { AppDataSource } from "database";
import { Repository } from "typeorm";
import { ICommentsRepository } from "../ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  repository: Repository<Comment>;

  constructor() {
    this.repository = AppDataSource.getRepository(Comment);
  }

  async create(data: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create(data);

    await this.repository.save(comment);

    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const repositories = await this.repository.find();

    return repositories;
  }
}
