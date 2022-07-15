import { ICreateCommentDTO } from "@modules/posts/dtos/ICreateCommentDTO";
import { Comment } from "@modules/posts/entities/Comment";
import { AppDataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { ICommentsRepository } from "../ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  repository: Repository<Comment>;

  constructor() {
    this.repository = AppDataSource.getRepository(Comment);
  }

  async create(data: ICreateCommentDTO): Promise<Comment> {
    const newComment = this.repository.create(data);

    await this.repository.save(newComment);

    const comment = await this.repository.findOne({
      where: {
        id: newComment.id,
      },
      relations: ["user"],
    });

    return comment!;
  }

  async list(): Promise<Comment[]> {
    const repositories = await this.repository.find();

    return repositories;
  }

  async findById(comment_id: string): Promise<Comment | null> {
    const comment = await this.repository.findOne({
      where: {
        id: comment_id,
      },
    });

    if (!comment) return null;

    return comment;
  }

  async findByPostId(post_id: string): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: {
        post_id,
      },
      relations: ["user"],
    });

    return comments;
  }

  async delete(comment_id: string): Promise<void> {
    await this.repository.delete({ id: comment_id });
  }
}
