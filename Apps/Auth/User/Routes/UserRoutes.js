import express from 'express'
import { UserValidation, UserValidationError } from '../../../../Validation/UserValidation.js';
import Signup from '../Api/Singup.js';

const UserRouter = express.Router();

UserRouter.get('/',(req,res)=>{
    return res.status(200).json({data:"hello world"})
})
UserRouter.post('/tr/user/signup',UserValidation,UserValidationError,Signup)

export default UserRouter;