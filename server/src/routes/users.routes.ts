import multer from "multer";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { GetUserProfileController } from "@modules/users/useCases/getUserProfile/GetUserProfileController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetUsersController } from "../modules/users/useCases/getUsers/GetUsersController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "@config/upload";
const multerUpload = multer(uploadConfig);

export const usersRoutes = Router();

const getUsersController = new GetUsersController();
const createUserController = new CreateUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();

/**
 * @openapi
 * '/users':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Users
 *     summary: Get a list of users (This is just a example for dev and tests purpose)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  email:
 *                    type: string
 *                  name:
 *                    type: string
 *                  role:
 *                    type: string
 *                  avatar:
 *                    type: string
 *                  created_at:
 *                    type: string
 *                  updated_at:
 *                    type: string
 *       400:
 *         description: Bad request
 *       401:
 *        description: Unauthorized
 *       500:
 *         description: Internal server error
 */
usersRoutes.get("/", ensureAuthenticated, getUsersController.handle);

/**
 * @openapi
 * '/users':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                avatar:
 *                  type: string
 *                role:
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
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                avatar:
 *                  type: string
 *                role:
 *                  type: string
 *      400:
 *        description: User already exists.
 *      500:
 *        description: Internal server error
 */
usersRoutes.post("/", createUserController.handle);

usersRoutes.get(
  "/profile",
  ensureAuthenticated,
  getUserProfileController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  multerUpload.single("avatar"),
  updateUserAvatarController.handle
);
