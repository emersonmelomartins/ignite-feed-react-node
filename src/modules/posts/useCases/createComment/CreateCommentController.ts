import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCommentUseCase } from "./CreateCommentUseCase";

export class CreateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user!;
    const { post_id } = request.params;
    const { commentary } = request.body;

    const createCommentUseCase = container.resolve(CreateCommentUseCase);

    const comment = await createCommentUseCase.execute({
      user_id,
      post_id,
      commentary,
    });

    return response.json(comment);
  }
}
