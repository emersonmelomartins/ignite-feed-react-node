import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreateCommentController } from "@modules/posts/useCases/createComment/CreateCommentController";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { GetPostController } from "@modules/posts/useCases/getPost/GetPostController";
import { GiveCommentLikeController } from "@modules/posts/useCases/giveCommentLike/GiveCommentLikeController";
import { Router } from "express";

export const postsRoutes = Router();

const createPostController = new CreatePostController();
const getPostController = new GetPostController();
const createCommentController = new CreateCommentController();
const giveCommentLikeController = new GiveCommentLikeController();

/**
 * @openapi
 * '/posts':
 *  post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Posts
 *     summary: Create a new post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                      value:
 *                        type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                      value:
 *                        type: string
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

postsRoutes.get("/:post_id", ensureAuthenticated, getPostController.handle);

postsRoutes.post(
  "/:post_id/comment",
  ensureAuthenticated,
  createCommentController.handle
);

postsRoutes.patch(
  "/comment/:comment_id/like",
  ensureAuthenticated,
  giveCommentLikeController.handle
);
