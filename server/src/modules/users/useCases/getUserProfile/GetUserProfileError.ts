import { AppError } from "@shared/errors/AppError";

export namespace GetUserProfileError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User not found", 404);
    }
  }
}
