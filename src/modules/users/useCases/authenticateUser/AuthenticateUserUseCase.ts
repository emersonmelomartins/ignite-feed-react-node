import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AuthenticateUserError } from "./AuthenticateUserError";

import authConfig from "../../../../config/auth";
import { UserMap } from "@modules/users/mapper/UserMap";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  avatar_url?: () => string;
}

@injectable()
export class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AuthenticateUserError.IncorrectUserOrPassword();
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AuthenticateUserError.IncorrectUserOrPassword();
    }

    const token = sign({ id: user.id! }, authConfig.secret, {
      // subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    const userMapper = UserMap.toDTO(user);

    const response: IResponse = {
      name: userMapper.name,
      email: userMapper.email,
      role: userMapper.role,
      avatar: userMapper.avatar,
      avatar_url: userMapper.avatar_url,
      token,
    };

    return response;
  }
}
