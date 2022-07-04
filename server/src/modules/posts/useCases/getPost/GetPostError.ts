import { AppError } from "@shared/errors/AppError";

export namespace GetPostError {
  export class NotFound extends AppError {
    constructor() {
      super("Post not found", 404)
    }
  }
}