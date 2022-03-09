import Joi from "joi"

export default class UserValidation {
    registerSchema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(1).required(),
        password: Joi.string().min(5).required(),
        full_name: Joi.string().required(),
        phone_number: Joi.number().required()
    })

    loginSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.required()
    })
}