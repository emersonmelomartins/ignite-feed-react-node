import fs from "fs";

import { User } from "@modules/users/entities/User";
import { AppError } from "@shared/errors/AppError";

import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { LocalStorageProvider } from "@shared/container/providers/implementations/LocalStorageProvider";
import { IStorageProvider } from "@shared/container/providers/IStorageProvider";

import { UpdateUserAvatarUseCase } from "../UpdateUserAvatarUseCase";
import { UpdateUserAvatarError } from "../UpdateUserAvatarError";

describe("Update user avatar", () => {
  let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
  let inMemoryUsersRepository: IUsersRepository;
  let storageProvider: IStorageProvider;

  let user: User;

  let files: string[] = ["./tmp/image.png", "./tmp/another_image.png"];

  beforeAll(async () => {
    files.forEach((file) => {
      try {
        fs.createWriteStream(file);
      } catch (err) {
        throw new AppError("Can't create mock file.");
      }
    });
  });

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    storageProvider = new LocalStorageProvider();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      inMemoryUsersRepository,
      storageProvider
    );

    user = await inMemoryUsersRepository.create({
      avatar: "",
      email: "user@email.com",
      name: "User",
      password: "123456",
      role: "Some Role",
    });
  });

  afterAll(async () => {
    files.push("./tmp/avatar/image.png");
    files.push("./tmp/avatar/another_image.png");

    files.forEach(async (file) => {
      let exists = false;

      try {
        await fs.promises.stat(file);
        exists = true;
      } catch (err) {}

      if (exists) {
        await fs.promises.unlink(file);
      }
    });
  });

  it("should be able to update user avatar", async () => {
    await updateUserAvatarUseCase.execute({
      user_id: user.id!,
      filename: "image.png",
    });

    const updatedUser = await inMemoryUsersRepository.findById(user.id!);

    expect(updatedUser!.avatar).toEqual("image.png");
  });

  it("should be able to replace user avatar and delete previous avatar", async () => {
    await updateUserAvatarUseCase.execute({
      user_id: user.id!,
      filename: "another_image.png",
    });

    const updatedUser = await inMemoryUsersRepository.findById(user.id!);

    expect(updatedUser!.avatar).toEqual("another_image.png");
  });

  it("should not be able to update user avatar with non-existing user", async () => {
    await expect(
      updateUserAvatarUseCase.execute({
        user_id: "some_random_id_that_dont_exists",
        filename: "image.png",
      })
    ).rejects.toEqual(new UpdateUserAvatarError.UserNotFound());
  });

  it("should not be able to update user avatar without file", async () => {
    await expect(
      updateUserAvatarUseCase.execute({
        user_id: user.id!,
        filename: "",
      })
    ).rejects.toEqual(new UpdateUserAvatarError.FileNotFound());
  });
});
