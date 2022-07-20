import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

export const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

  /**
   * @openapi
   * '/sessions':
   *  post:
   *     tags:
   *     - Sessions
   *     summary: Authenticate a existing user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                password:
   *                  type: string
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *           schema:
   *              type: object
   *              properties:
   *                name:
   *                  type: string
   *                email:
   *                  type: string
   *                role:
   *                  type: string
   *                avatar:
   *                  type: string
   *                avatar_url:
   *                  type: string
   *                token:
   *                  type: string
   *      400:
   *        description: Incorrect email or password.
   *      500:
   *        description: Internal server error
   */
sessionsRoutes.post("/", authenticateUserController.handle);
