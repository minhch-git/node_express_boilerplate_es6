import express from 'express'
import validate from '../../middleware/validate'
import userValidation from '../../validations/userValidation'
import UserCtrl from '../../controllers/UserCtrl'
import asyncHandler from '../../utils/asyncHandler'
const router = express.Router();

router
    .route('/')
    .post(validate(userValidation.createUser), asyncHandler(UserCtrl.createUser))
    .get(validate(userValidation.getUsers), asyncHandler(UserCtrl.getUsers));

router
    .route('/:userId')
    .get(validate(userValidation.getUser), asyncHandler(UserCtrl.getUser))
    .patch(validate(userValidation.updateUser), asyncHandler(UserCtrl.updateUser))
    .delete(validate(userValidation.deleteUser), asyncHandler(UserCtrl.deleteUser));

export default router;
