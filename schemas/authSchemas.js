import Joi from "joi";

export const createRegisterSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(3).max(20).required(),
    name: Joi.string().min(3).max(20).required(),
});

export const createLoginSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(3).max(20).required(),
});