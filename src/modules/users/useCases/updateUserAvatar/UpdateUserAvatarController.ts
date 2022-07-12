import { Request, Response } from "express";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) {
      //...
      return response.status(400).json(file);
    }

    return response.json({
      file,
    });
  }
}
