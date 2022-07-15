import { AppError } from "@shared/errors/AppError";

export namespace UpdateUserAvatarError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User not found", 404);
    }
  }

  export class FileNotFound extends AppError {
    constructor() {
      super("File not found", 404);
    }
  }
}
