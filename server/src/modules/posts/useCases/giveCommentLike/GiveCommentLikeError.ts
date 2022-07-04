import { AppError } from "@shared/errors/AppError";

export namespace GiveCommentLikeError {
  export class NotFound extends AppError {
    constructor() {
      super("Post not found", 404)
    }
  }
}