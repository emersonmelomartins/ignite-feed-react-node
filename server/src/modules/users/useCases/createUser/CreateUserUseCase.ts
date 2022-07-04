import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { hash } from "bcryptjs";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { CreateUserSchema } from "./CreateUserSchema";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<IUserResponseDTO> {
    const schema = new CreateUserSchema();

    await schema.validate(data);

    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new CreateUserError.AlreadyExists();
    }

    const encryptedPassword = await hash(data.password, 8);

    data.password = encryptedPassword;

    const { avatar, email, name, role, id } = await this.usersRepository.create(
      data
    );

    return {
      id,
      name,
      email,
      role,
      avatar,
    };
  }
}
