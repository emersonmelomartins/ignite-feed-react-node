import { AppError } from "@shared/errors/AppError";

export namespace UpdateUserAvatarError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User not found", 404);
    }
  }
}
