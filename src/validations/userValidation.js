import { string, number, mixed } from 'yup'
import { yupObject, typeObjectId, typePassword } from './customValidation'

const createUser = {
    email: string().required().email(),
    password: typePassword,
    name: string().required(),
    role: mixed().oneOf(['user', 'admin']).required()
}

const getUsers = {
    name: string(),
    role: string(),
    sortBy: string(),
    limit: number().integer(),
    page: number().integer(),
}

const getUser = {
    userId: typeObjectId('userId')
}

const updateUser = {
    userId: typeObjectId('userId'),
    email: string().email(),
    password: typePassword,
    name: string(),
    role: string(),
}

const deleteUser = {
    userId: typeObjectId('userId'),
}


export default {
    createUser: yupObject(createUser),
    getUsers: yupObject(getUsers),
    getUser: yupObject(getUser),
    updateUser: yupObject(updateUser),
    deleteUser: yupObject(deleteUser),
};
