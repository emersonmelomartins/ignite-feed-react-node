import { AppError } from "../../../../shared/errors/AppError";

export namespace CreateUserError {
  export class AlreadyExists extends AppError {
    constructor() {
      super("User already exists.", 400);
    }
  }
}
