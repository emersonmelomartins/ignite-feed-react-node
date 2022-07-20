import { User } from "@modules/users/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { UpdateUserDataError } from "./UpdateUserDataError";

interface IRequest {
  id: string;
  role: string;
}

@injectable()
export class UpdateUserDataUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, role }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UpdateUserDataError.UserNotFound();
    }

    user.role = role;

    await this.usersRepository.create(user);

    return user;
  }
}
