import express from 'express'
import { UserValidation, UserValidationError } from '../../../../Validation/UserValidation.js';
import Signup from '../Api/Singup.js';
import Signin from '../Api/Singin.js';

const UserRouter = express.Router();

UserRouter.post('/tr/user/signup',UserValidation,UserValidationError,Signup)
UserRouter.post('/tr/user/signin',Signin)

export default UserRouter;