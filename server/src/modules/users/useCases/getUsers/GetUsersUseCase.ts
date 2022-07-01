import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class GetUsersUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IUserResponseDTO[]> {
    const users = await this.usersRepository.list();

    const usersMapper = UserMap.ArrayToDTO(users);
    return usersMapper;
  }
}
