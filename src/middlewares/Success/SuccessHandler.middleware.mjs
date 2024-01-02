'use strict';
// TODO: Add a success handler middleware
import customSucessMessages from './successMessages.mjs';


const SuccessHandler = (success, req, res, next) => {
    const green = '\x1b[32m';
    const backgroundGreen = '\x1b[42m';
    const normal = '\x1b[0m';
    const customSuccess = customSucessMessages[success.code]

    if (customSuccess) {
        const statusCode = parseInt(success.code.toString().slice(0, 3));
        _log(`${backgroundGreen}[SUCCESS]${normal}: ${green}[${statusCode}]${normal} => ${customSuccess}`)

        return {
            success: true,
            code: success.code,
            status: statusCode,
            message: customSuccess,
            data: success.data
        };
    }

    // next(error);
}


export default SuccessHandler;
