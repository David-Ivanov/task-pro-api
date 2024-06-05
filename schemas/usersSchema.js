import Joi from "joi";

export const createHelpSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    comment: Joi.string().min(5).required(),
});