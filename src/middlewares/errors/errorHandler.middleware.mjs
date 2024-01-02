'use strict';
// TODO: Add a error handler middleware
import customErrorsMessages from './errorsMessages.mjs';


const ErrorHandler = (error, req, res, next) => {
    const red = '\x1b[31m';
    const backgroundRed = '\x1b[41m';
    const normal = '\x1b[0m';
    const customError = customErrorsMessages[error.code]

    if (customError) {
        const statusCode = parseInt(error.code.toString().slice(0, 3));
        _log(`${backgroundRed}[ERROR]${normal}:${red}[${statusCode}]${normal} => ${customError}\n`, error.error)

        return {
            success: false,
            code: error.code,
            status: statusCode,
            message: customError,
            error: (statusCode === 500) ? undefined : error.error
        };
    }

    // next(error);
}


export default ErrorHandler;
