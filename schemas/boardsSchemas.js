import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().trim().messages({
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
})
  .min(1)
  .messages({ "object.min": "No request body" });

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(1).max(50).trim().messages({
    "string.base": "'title' must be string type",
    "string.min": "Min. title length is 1 symbol",
    "string.max": "Max. title length is 50 symbols",
  }),
  background: Joi.string().trim().messages({
    "string.base": "'background' must be string type",
  }),
  icon: Joi.string().trim().messages({
    "string.base": "'icon' must be string type",
  }),
})
  .min(1)
  .messages({ "object.min": "No request body" });

export const changeBoardsBackgroundSchema = Joi.object({
  background: Joi.string().required().messages({
    "any.required": "'background' value is required",
    "string.base": "'background' must be string type",
  }),
});

export const columnSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "'title' value is required",
  }),
  boardId: Joi.string().required().messages({
    "any.required": "'boardId' value is required",
  }),
});
