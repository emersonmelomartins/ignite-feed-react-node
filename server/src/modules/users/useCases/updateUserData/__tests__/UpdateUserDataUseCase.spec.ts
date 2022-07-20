import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UpdateUserDataError } from "../UpdateUserDataError";
import { UpdateUserDataUseCase } from "../UpdateUserDataUseCase";

describe("Update User Data", () => {
  let updateUserDataUseCase: UpdateUserDataUseCase;
  let inMemoryUsersRepository: IUsersRepository;

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    updateUserDataUseCase = new UpdateUserDataUseCase(inMemoryUsersRepository);
  });

  it("should be able to update data for a existing user", async () => {
    const user = await inMemoryUsersRepository.create({
      avatar: "",
      email: "user@email.com",
      name: "User",
      password: "123456",
      role: "Random Role",
    });

    const response = await updateUserDataUseCase.execute({
      id: user.id!,
      role: "Another role",
    });

    expect(response.role).toBe("Another role");
  });

  it("should not be able to update data if user not exists", async () => {
    await expect(
      updateUserDataUseCase.execute({
        id: "123456",
        role: "Another role",
      })
    ).rejects.toEqual(new UpdateUserDataError.UserNotFound());
  });
});
