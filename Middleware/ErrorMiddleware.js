const ErrorMiddleware = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal server'
    return res.status(err.statusCode).json({error:err.message})
}

export default ErrorMiddleware ;