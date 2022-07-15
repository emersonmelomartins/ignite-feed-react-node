import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserSchema } from "./CreateUserSchema";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<IUserResponseDTO> {
    const schema = new CreateUserSchema();

    try {
      await schema.validate(data);
    } catch (err) {
      throw new AppError((err as Error).message);
    }

    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new CreateUserError.AlreadyExists();
    }

    const encryptedPassword = await hash(data.password, 8);

    data.password = encryptedPassword;

    const user = await this.usersRepository.create(data);

    const response = UserMap.toDTO(user);

    return response;
  }
}
