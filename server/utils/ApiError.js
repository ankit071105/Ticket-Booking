class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went something",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.succuss = false;
        this.errors = errors

        if(stack) {
            this.stack = stack;

        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError};