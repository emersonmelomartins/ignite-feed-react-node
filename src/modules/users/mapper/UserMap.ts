import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../entities/User";

export class UserMap {
  static toDTO({ id, email, name, avatar, role }: User): IUserResponseDTO {
    return instanceToInstance({
      id,
      email,
      name,
      avatar,
      role,
    });
  }

  static ArrayToDTO([
    { id, email, name, avatar, role, created_at, updated_at },
  ]: User[]): IUserResponseDTO[] {
    return instanceToInstance([
      { id, email, name, avatar, role, created_at, updated_at },
    ]);
  }
}
