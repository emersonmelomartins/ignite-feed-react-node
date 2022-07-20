import multer from "multer";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { GetUserProfileController } from "@modules/users/useCases/getUserProfile/GetUserProfileController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { GetUsersController } from "@modules/users/useCases/getUsers/GetUsersController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "@config/upload";
import { UpdateUserDataController } from "@modules/users/useCases/updateUserData/UpdateUserDataController";
const multerUpload = multer(uploadConfig);

export const usersRoutes = Router();

const getUsersController = new GetUsersController();
const createUserController = new CreateUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserDataController = new UpdateUserDataController();

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
 *      201:
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
 *                avatar:
 *                  type: string
 *                avatar_url:
 *                  type: string
 *                role:
 *                  type: string
 *      400:
 *        description: User already exists.
 *      500:
 *        description: Internal server error
 */
usersRoutes.post("/", createUserController.handle);

/**
 * @openapi
 * '/users/profile':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Users
 *     summary: Get current user profile
 *     responses:
 *      201:
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
 *                avatar:
 *                  type: string
 *                avatar_url:
 *                  type: string
 *                role:
 *                  type: string
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal server error
 */
usersRoutes.get(
  "/profile",
  ensureAuthenticated,
  getUserProfileController.handle
);

/**
 * @openapi
 * '/users/avatar':
 *  patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Users
 *     summary: Update current user avatar
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              avatar:
 *                type: string
 *                format: binary
 *     responses:
 *      204:
 *        description: Success
 *      400:
 *        description: User already exists.
 *      500:
 *        description: Internal server error
 */
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  multerUpload.single("avatar"),
  updateUserAvatarController.handle
);

/**
 * @openapi
 * '/users/personal':
 *  put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Users
 *     summary: Update current user personal data
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              role:
 *                type: string
 *     responses:
 *      204:
 *        description: Success
 *      500:
 *        description: Internal server error
 */
usersRoutes.put(
  "/personal",
  ensureAuthenticated,
  updateUserDataController.handle
);
