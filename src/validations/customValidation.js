import { string, object } from 'yup'
const yupObject = (obj) => object().shape(obj).noUnknown(true)

let regexObjectId = /^[0-9a-fA-F]{24}$/
let regexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

let typePassword = string().required()
    .matches(regexPassword, "Password must contain at least 1 letter and 1 number, and at least 6 or more characters")

let typeObjectId = (label = "objectId") => string().required().matches(regexObjectId, "${label} must be a valid mongo id").label(label)

export { yupObject, typeObjectId, typePassword }
