import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().min(3),
  phone: Joi.string().min(4),
});

export const changeBoardsBackgroundSchema = Joi.object({
  background: Joi.string().required().messages({
    "any.required": "background value is required",
  }),
});
