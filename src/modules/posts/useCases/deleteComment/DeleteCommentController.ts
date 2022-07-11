import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

export class DeleteCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { comment_id, post_id } = request.params;
    const user_id = request.user!;

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    await deleteCommentUseCase.execute(post_id, comment_id, user_id);

    return response.send(204);
  }
}
