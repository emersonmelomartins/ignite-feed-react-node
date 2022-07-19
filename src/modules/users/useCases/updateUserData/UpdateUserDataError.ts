import { AppError } from "@shared/errors/AppError";

export namespace UpdateUserDataError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User not found", 404);
    }
  }
}
