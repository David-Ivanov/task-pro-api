import Joi from "joi";

export const createEditSchema = Joi.object({
    email: Joi.string().email().min(3),
    password: Joi.string().min(3).max(20),
    name: Joi.string().min(3).max(20),
});