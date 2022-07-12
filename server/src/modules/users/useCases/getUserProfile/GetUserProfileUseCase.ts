import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUserProfileUseCase {
  
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  
  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
  
    if(!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}