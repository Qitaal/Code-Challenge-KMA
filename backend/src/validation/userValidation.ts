import Joi from "joi";
import { IUser } from "../interfaces/userInterface";

export const validateRegistration = (data: any) => {
  const registrationSchema = Joi.object<IUser>({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
      .required()
      .messages({
        "string.pattern.base":
          "Password harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka.",
      }),
  });

  const { error } = registrationSchema.validate(data);
  return error;
};

export const validateLogin = (data: any) => {
  const loginSchema = Joi.object<IUser>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = loginSchema.validate(data);
  return error;
};
