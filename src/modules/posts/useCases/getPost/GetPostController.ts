import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPostUseCase } from "./GetPostUseCase";

export class GetPostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const getPostUseCase = container.resolve(GetPostUseCase);

    const post = await getPostUseCase.execute({ post_id });

    return response.json(post);
  }
}
