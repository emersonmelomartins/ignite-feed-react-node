import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserError } from "../CreateUserError";
import { CreateUserUseCase } from "../CreateUserUseCase";

describe("Create User", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: IUsersRepository;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should create a new user", async () => {
    const user = await createUserUseCase.execute({
      avatar: "",
      email: "john.doe@gmail.com",
      name: "John Doe",
      password: "123456",
      role: "Web Developer",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not create a new user if e-mail already exists", async () => {
    await usersRepository.create({
      avatar: "",
      email: "john.doe@gmail.com",
      name: "John Doe",
      password: "123456",
      role: "Web Developer",
    });

    await expect(
      createUserUseCase.execute({
        avatar: "",
        email: "john.doe@gmail.com",
        name: "John Doe",
        password: "123456",
        role: "Web Developer",
      })
    ).rejects.toEqual(new CreateUserError.AlreadyExists());
  });

  it("should not create a new user if invalid email", async () => {
    await expect(
      createUserUseCase.execute({
        avatar: "",
        email: "johndoegmail.com",
        name: "John Doe",
        password: "123456",
        role: "Web Developer",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a new user if password is not at least 6 characters", async () => {
    await expect(
      createUserUseCase.execute({
        avatar: "",
        email: "john.doe@gmail.com",
        name: "John Doe",
        password: "1234",
        role: "Web Developer",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
