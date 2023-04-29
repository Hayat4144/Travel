import ErrorHandler from '../utils/ErrorHandler.js'
import AsyncFunctionError from '../utils/AsyncFunctionError.js'
import jwt from 'jsonwebtoken'
import UserModal from '../Apps/Auth/User/Models/UserModal.js'

const AuthMiddleware = AsyncFunctionError(async (req, res, next) => {
    const jwt_token = process.env.NODE_ENV === "production" ? req.cookies.token : req.cookies.token_dev;
    if (jwt_token === undefined) return next(new ErrorHandler('you are unauthorized.', 401))
    const verify_option = {
        expiresIn: "10d",
        algorithm: ["HS256"]
    }
    const verify_token = jwt.verify(jwt_token, process.env.JWT_SECRET, verify_option)
    if (!verify_token) return next(new ErrorHandler('you session has been expired', 401))
    await UserModal.findById(verify_token.id)
        .exec((err, doc) => {
            if (err) {
                return res.status(400).json({ error: "Sorry you are not authorized." })
            }
            if (doc === null) {
                next(new ErrorHandler('Sorry, you are trying to access private resources which are not allowed. you may be not a normal user.', 400))
            }
            else {
                req.user_id = doc._id;
                req.email = doc.email;
                next();
            }

        })
})

export default AuthMiddleware;