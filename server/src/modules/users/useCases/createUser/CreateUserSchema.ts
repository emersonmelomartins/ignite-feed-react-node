import Joi from "joi";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";

export class CreateUserSchema {
  async validate({ avatar, email, name, password, role }: ICreateUserDTO) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
      name: Joi.string().required(),
      role: Joi.string().required(),
      avatar: Joi.string().min(0),
    }).messages({
      "string.required": "{{#label}} is required!",
      "string.empty": "{{#label}} can't be empty!",
      "string.min": "{{#label}} must have at least {{#limit}} characters long!",
      "string.max":
        "{{#label}} length must be less than or equal to {{#limit}} characters long",
    });

    return await schema.validateAsync({
      avatar,
      email,
      name,
      password,
      role,
    });
  }
}
