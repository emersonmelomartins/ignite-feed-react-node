import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserDataUseCase } from "./UpdateUserDataUseCase";

export class UpdateUserDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.user;
    const { role } = request.body;

    const updateUserDataUseCase = container.resolve(UpdateUserDataUseCase);

    await updateUserDataUseCase.execute({ id, role });

    return response.status(204).send();
  }
}
