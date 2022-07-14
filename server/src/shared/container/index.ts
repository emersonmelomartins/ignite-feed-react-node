import { container } from "tsyringe";

import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";
import { CommentsRepository } from "@modules/posts/repositories/implementations/CommentsRepository";

import { PostsRepository } from "@modules/posts/repositories/implementations/PostsRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import "./providers";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPostsRepository>(
  "PostsRepository",
  PostsRepository
);

container.registerSingleton<ICommentsRepository>(
  "CommentsRepository",
  CommentsRepository
);
