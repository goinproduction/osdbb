import Joi from "joi"

export default class UserValidation {
    registerSchema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().regex(/^[^0-9][a-zA-Z0-9_]+$/).required(),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required(),
        full_name: Joi.string().required(),
        phone_number: Joi.string().regex(/(0[3|5|7|8|9])+([0-9]{8})\b/).required()
    })

    loginSchema = Joi.object({
        username: Joi.required(),
        password: Joi.required()
    })

    loginGoogleSchema = Joi.object({
        username: Joi.required(),
        full_name: Joi.required(),
        email: Joi.required(),
        avatar: Joi.required(),
    })

    updateSchema = Joi.object({
        full_name: Joi.string().optional(),
        phone_number: Joi.string().regex(/(0[3|5|7|8|9])+([0-9]{8})\b/).optional(),
        avatar: Joi.optional()
    })
}