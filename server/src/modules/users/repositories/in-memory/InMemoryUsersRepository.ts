import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async list(): Promise<User[]> {
    return this.users;
  }
  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
