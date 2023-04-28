import AsyncFunctionError from '../../../../utils/AsyncFunctionError.js'
import ErrorHandler from '../../../../utils/ErrorHandler.js'
import UserModal from '../Models/UserModal.js'
import bcrypt from 'bcrypt'

const Signup = AsyncFunctionError(async (req, res, next) => {
  const { firstName, lastName, email, password, Phone_Number } = req.body;
  const saltRound = 10;
  const hashpassword = await bcrypt.hash(password, saltRound);
  const create_user = {
    firstName,
    lastName,
    email,
    password: hashpassword,
    Phone_Number,
  };
  const doc = new UserModal(create_user)
  await doc.save().then(doc => {
    return res.status(200).json({ data: `${doc.email} has been created Successfully.` });
  }
  ).catch(error => {
    if (error.code === 11000) return next(new ErrorHandler(`${error.keyValue.email} is already exist.`, 400))
    if (error) return next(new ErrorHandler(error.message, 400));
    
  })
})

export default Signup;