import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
  async handle(request: Request, response: Response): Promise<Response> {

    const getUsersUseCase = container.resolve(GetUsersUseCase);

    const users = await getUsersUseCase.execute();

    return response.send(users);
  }
}
