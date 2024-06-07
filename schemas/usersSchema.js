import Joi from "joi";


export const createEditSchema = Joi.object({
    email: Joi.string().email().min(3),
    password: Joi.string().min(3).max(20),
    name: Joi.string().min(3).max(20),
});

export const createHelpSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    comment: Joi.string().min(5).required(),
});


export const createAvatarSchema = Joi.string().valid('image/jpeg', 'image/jpg', 'image/png', 'image/webp');