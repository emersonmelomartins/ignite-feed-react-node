import { User } from "@modules/users/entities/User";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { LocalStorageProvider } from "@shared/container/providers/implementations/LocalStorageProvider";
import { IStorageProvider } from "@shared/container/providers/IStorageProvider";
import { UpdateUserAvatarUseCase } from "../UpdateUserAvatarUseCase";

describe("Update user avatar", () => {
  let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
  let inMemoryUsersRepository: IUsersRepository;
  let localStorageProvider: IStorageProvider;

  let user: User;

  beforeAll(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    localStorageProvider = new LocalStorageProvider();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      inMemoryUsersRepository,
      localStorageProvider
    );

    user = await inMemoryUsersRepository.create({
      avatar: "",
      email: "user@email.com",
      name: "User",
      password: "123456",
      role: "Some Role",
    });
  });

  it("should update user avatar", async () => {
    await updateUserAvatarUseCase.execute({
      user_id: user.id!,
      filename: "file.jpg",
    });

    const updatedUser = await inMemoryUsersRepository.findById(user.id!);

    expect(updatedUser!.avatar).toEqual("file.jpg");
  });
});
