import { AppError } from "@shared/errors/AppError";

export namespace CreateCommentError {
  export class PostNotFound extends AppError {
    constructor() {
      super("Post not found", 404);
    }
  }
}
