import { PostsRepository } from "@modules/posts/repositories/implementations/PostsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPostsRepository>(
  "PostsRepository",
  PostsRepository
);
