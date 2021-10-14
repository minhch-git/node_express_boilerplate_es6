import Joi from 'joi'
import { password, objectId, body, query, params } from './customValidation'
const createUser = body({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
})


const getUsers = query({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
})


const getUser = params({
    userId: Joi.string().custom(objectId),
})


const updateUser = Object.assign(
    params({
        userId: Joi.required().custom(objectId),
    }),
    body({
        email: Joi.string().email(),
        password: Joi.string().custom(password),
        name: Joi.string(),
        role: Joi.string(),
    })
)


const deleteUser = params({
    userId: Joi.string().custom(objectId),
})


export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};