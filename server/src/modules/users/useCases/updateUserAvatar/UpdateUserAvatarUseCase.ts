import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/IStorageProvider";
import { UpdateUserAvatarError } from "./UpdateUserAvatarError";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  filename?: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("LocalStorageProvider")
    private localStorageProvider: IStorageProvider
  ) {}

  async execute({ user_id, filename }: IRequest): Promise<void> {
    if (!filename) {
      throw new UpdateUserAvatarError.FileNotFound();
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      this.localStorageProvider.delete(filename, "");

      throw new UpdateUserAvatarError.UserNotFound();
    }

    if (user.avatar) {
      this.localStorageProvider.delete(user.avatar, "avatar");
    }

    this.localStorageProvider.save(filename, "avatar");

    user.avatar = filename;

    await this.usersRepository.create(user);
  }
}
