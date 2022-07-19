import { AppError } from "@shared/errors/AppError";

export namespace CreateCommentError {
  export class PostNotFound extends AppError {
    constructor() {
      super("Post not found", 404);
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super("User not found", 404);
    }
  }
}
