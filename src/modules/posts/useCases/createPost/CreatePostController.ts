import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.user;
    const { content } = request.body;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const post = await createPostUseCase.execute({ user_id: id!, content });

    return response.json(post);
  }
}
