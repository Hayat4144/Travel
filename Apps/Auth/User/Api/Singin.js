import AsyncFunctionError from '../../../../utils/AsyncFunctionError.js'
import ErrorHandler from '../../../../utils/ErrorHandler.js'
import bcrypt from 'bcrypt'
import UserModel from '../Models/UserModal.js'
import jwt from 'jsonwebtoken'

const Signin = AsyncFunctionError(async (req, res, next) => {
    const { email, password } = req.body;
    const IsUserExist = await UserModel.findOne({ email: email });
    if (!IsUserExist) {
        return next(new ErrorHandler('Sorry, Invalid/Credentials', 400))
    }
    if (IsUserExist && (await bcrypt.compare(password, IsUserExist.password))) {

        // signinoptions for jwt sign
        var signOptions = {
            expiresIn: "10d",
            algorithm: "HS256"
        };

        // jwt payload
        const payload = {
            id: IsUserExist._id,
            email: IsUserExist.email,
            name: IsUserExist.firstName + ' ' + IsUserExist.lastName,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, signOptions )
        if (process.env.NODE_ENV === "production") {
            res.cookie('token', token, {
                expires: new Date(Date.now() + 864000000), // for 10 days in production only 864000000
                sameSite: 'none',
                secure: true,
            }
            )
        } else {
            res.cookie('token_dev', token, {
                expires: new Date(Date.now() + 864000000),
                sameSite: 'none',
                secure: true,
            })
        }

        return res.status(200).send({ data: 'Login Successfull.', token })
    }
    return next(new ErrorHandler('Invalid email/password', 400))
})

export default Signin;