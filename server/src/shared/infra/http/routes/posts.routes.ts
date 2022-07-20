import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { GetPostController } from "@modules/posts/useCases/getPost/GetPostController";
import { ListPostsController } from "@modules/posts/useCases/listPosts/ListPostsController";
import { Router } from "express";

export const postsRoutes = Router();

const createPostController = new CreatePostController();
const getPostController = new GetPostController();
const listPostsController = new ListPostsController();

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
 *                      order:
 *                        type: number
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
 *                user_id:
 *                  type: string
 *                created_at:
 *                  type: string
 *                updated_at:
 *                  type: string
 *                content:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                      value:
 *                        type: string
 *                      order:
 *                        type: number
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

/**
 * @openapi
 * '/posts':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Posts
 *     summary: Get all posts
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
 *                  created_at:
 *                    type: string
 *                  updated_at:
 *                    type: string
 *                  content:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        post_id:
 *                          type: string
 *                        type:
 *                          type: string
 *                        value:
 *                          type: string
 *                        order:
 *                          type: number
 *                  comments:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        likes:
 *                          type: number
 *                        user_id:
 *                          type: string
 *                        post_id:
 *                          type: string
 *                        commentary:
 *                          type: string
 *                        created_at:
 *                          type: string
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
 *
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
postsRoutes.get("/", ensureAuthenticated, listPostsController.handle);

/**
 * @openapi
 * '/posts/{post_id}':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Posts
 *     summary: Get one post by id
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
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                user_id:
 *                  type: string
 *                created_at:
 *                  type: string
 *                updated_at:
 *                  type: string
 *                content:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      post_id:
 *                        type: string
 *                      type:
 *                        type: string
 *                      value:
 *                        type: string
 *                      order:
 *                        type: number
 *                comments:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      likes:
 *                        type: number
 *                      user_id:
 *                        type: string
 *                      post_id:
 *                        type: string
 *                      commentary:
 *                        type: string
 *                      created_at:
 *                        type: string
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
 *
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 */
postsRoutes.get("/:post_id", ensureAuthenticated, getPostController.handle);
