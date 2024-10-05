
const asyncHandler=(fn)=>async(req,resp,next)=>{
    try{
        await fn(req,resp,next)
    }
    catch(err){
        resp.status(err.code||500).json({
            success:false,
            message:err.message
        })
    }
}

export {asyncHandler};

/*
const asyncHandler=(requestHandler)=>{
    (req,resp,next)=>{
        Promise.resolve(requestHandler(req,resp,next)).catch((err)=>next(err))
    }
}
export {asyncHandler}
*/