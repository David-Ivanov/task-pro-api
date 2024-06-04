import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    phone: Joi.string().min(4).required(),
    owner: Joi.any(),
    favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().min(3),
    phone: Joi.string().min(4),
});