import { AppError } from "@shared/errors/AppError";
import Joi from "joi";

interface IValidate {
  commentary: string;
}

export class CreateCommentSchema {
  async validate({ commentary }: IValidate) {
    const schema = Joi.object({
      commentary: Joi.string().required(),
    });

    try {
      return await schema.validateAsync({ commentary });
    } catch (err) {
      throw new AppError((err as Error).message);
    }
  }
}
