
const asyncHandler=(fn)=>async(req,resp,next)=>{
    try{
        await fn(req,resp,next)
    }catch(err){
        resp.status(err.code||500).json({
            success:false,
            message:err.message
        })
    }
}

export {asyncHandler};

