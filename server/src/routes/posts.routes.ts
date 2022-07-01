import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { Router } from "express";

export const postsRoutes = Router();

const createPostController = new CreatePostController();
postsRoutes.post("/", ensureAuthenticated, createPostController.handle);
