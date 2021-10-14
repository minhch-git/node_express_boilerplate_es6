import express from 'express'
import validate from '../../middlewares/validate'
import userValidation from '../../validations/userValidation'
import UserCtrl from '../../controllers/UserCtrl'
import catchAsync from '../../utils/catchAsync'
const router = express.Router();

router
    .route('/')
    .post(validate(userValidation.createUser), catchAsync(UserCtrl.createUser))
    .get(validate(userValidation.getUsers), catchAsync(UserCtrl.getUsers));

router
    .route('/:userId')
    .get(validate(userValidation.getUser), catchAsync(UserCtrl.getUser))
    .patch(validate(userValidation.updateUser), catchAsync(UserCtrl.updateUser))
    .delete(validate(userValidation.deleteUser), catchAsync(UserCtrl.deleteUser));

export default router;
