import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { GetUserProfileError } from "../GetUserProfileError";
import { GetUserProfileUseCase } from "../GetUserProfileUseCase";

describe("Get User Profile", () => {
  let getUserProfileUseCase: GetUserProfileUseCase;
  let inMemoryUsersRepository: IUsersRepository;

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to return user data profile", async () => {
    const user = await inMemoryUsersRepository.create({
      avatar: "",
      email: "user@email.com",
      name: "User",
      password: "123456",
      role: "Random Role",
    });

    const response = await getUserProfileUseCase.execute(user.id!);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("name");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("avatar_url");
    expect(response).toHaveProperty("role");
  });

  it("should not be able to return invalid user id", async () => {
    await expect(getUserProfileUseCase.execute("1234546")).rejects.toEqual(
      new GetUserProfileError.UserNotFound()
    );
  });
});
