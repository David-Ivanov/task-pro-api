import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().min(3),
  phone: Joi.string().min(4),
});
