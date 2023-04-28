const AsyncFunctionError = AsyncFuncion => async(req,res,next)=>{
    Promise.resolve(AsyncFuncion(req,res,next)).catch(next)
}

export default AsyncFunctionError ;