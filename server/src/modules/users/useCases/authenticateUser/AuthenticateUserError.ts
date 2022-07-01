import { AppError } from "@shared/errors/AppError";

export namespace AuthenticateUserError {
  export class IncorrectUserOrPassword extends AppError {
    constructor() {
      super("Incorrect email or password.");
    }
  }
}
