import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().messages({
    "any.required": "title value is required",
    "string.base": "'title' must be string type",
    "string.min": "Min. title length is 1 symbol",
    "string.max": "Max. title length is 50 symbols",
  }),
  background: Joi.string().messages({
    "string.base": "'background' must be string type",
  }),
  icon: Joi.string().messages({
    "string.base": "'icon' must be string type",
  }),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().min(3),
  phone: Joi.string().min(4),
});

export const changeBoardsBackgroundSchema = Joi.object({
  background: Joi.string().required().messages({
    "any.required": "background value is required",
    "string.base": "'title' must be string type",
  }),
});
