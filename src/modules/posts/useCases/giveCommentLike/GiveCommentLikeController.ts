import { Request, Response } from "express";
import { container } from "tsyringe";
import { GiveCommentLikeUseCase } from "./GiveCommentLikeUseCase";

export class GiveCommentLikeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { comment_id } = request.params;

    const giveCommentlikeUseCase = container.resolve(GiveCommentLikeUseCase);

    await giveCommentlikeUseCase.execute(comment_id);

    return response.status(204).send();
  }
}
