import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCommentController } from "@modules/posts/useCases/createComment/CreateCommentController";
import { DeleteCommentController } from "@modules/posts/useCases/deleteComment/DeleteCommentController";
import { GiveCommentLikeController } from "@modules/posts/useCases/giveCommentLike/GiveCommentLikeController";
import { ListCommentsController } from "@modules/posts/useCases/listComments/ListCommentsController";
import { Router } from "express";

export const commentsRoutes = Router();


const createCommentController = new CreateCommentController();
const giveCommentLikeController = new GiveCommentLikeController();
const listCommentsController = new ListCommentsController();
const deleteCommentController = new DeleteCommentController();

/**
 * @openapi
 * '/comments/post/{post_id}':
 *  post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Comments
 *     summary: Create a new comment on an existing post
 *     parameters:
 *      - in: path
 *        name: post_id
 *        description: Post ID
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                commentary:
 *                  type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                commentary:
 *                  type: string
 *                created_at:
 *                  type: string
 *                likes:
 *                  type: number
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    email:
 *                      type: string
 *                    name:
 *                      type: string
 *                    avatar:
 *                      type: string
 *                    avatar_url:
 *                      type: string
 *                    role:
 *                      type: string
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 */
commentsRoutes.post(
  "/post/:post_id",
  ensureAuthenticated,
  createCommentController.handle
);

/**
 * @openapi
 * '/comments/{comment_id}/like':
 *  patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Comments
 *     summary: Give a existing comment like
 *     parameters:
 *      - in: path
 *        name: comment_id
 *        description: Comment ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      204:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 */
commentsRoutes.patch(
  "/:comment_id/like",
  ensureAuthenticated,
  giveCommentLikeController.handle
);

/**
 * @openapi
 * '/comments/post/{post_id}':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Comments
 *     summary: List all comments by post
 *     parameters:
 *      - in: path
 *        name: post_id
 *        description: Post ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  user_id:
 *                    type: string
 *                  post_id:
 *                    type: string
 *                  commentary:
 *                    type: string
 *                  created_at:
 *                    type: string
 *                  likes:
 *                    type: number
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      email:
 *                        type: string
 *                      name:
 *                        type: string
 *                      avatar:
 *                        type: string
 *                      avatar_url:
 *                        type: string
 *                      role:
 *                        type: string
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 */
commentsRoutes.get(
  "/post/:post_id",
  ensureAuthenticated,
  listCommentsController.handle
);


/**
 * @openapi
 * '/comments/post/{post_id}/{comment_id}':
 *  delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Comments
 *     summary: Delete comment
 *     parameters:
 *      - in: path
 *        name: post_id
 *        description: Post ID
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: comment_id
 *        description: Comment ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      204:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 */
commentsRoutes.delete(
  "/post/:post_id/:comment_id",
  ensureAuthenticated,
  deleteCommentController.handle
);
