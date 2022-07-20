import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { GetUsersUseCase } from "../GetUsersUseCase";

describe("Get Users", () => {
  let getUsersUseCase: GetUsersUseCase;
  let inMemoryUsersRepository: IUsersRepository;

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getUsersUseCase = new GetUsersUseCase(inMemoryUsersRepository);
  });

  it("should list all existing users", async () => {
    await inMemoryUsersRepository.create({
      avatar: "",
      email: "user@email.com",
      name: "User",
      password: "123456",
      role: "Random Role",
    });

    const users = await getUsersUseCase.execute();

    expect(users.length).toBe(1);
  });
});
