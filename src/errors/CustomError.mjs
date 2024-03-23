import customErrorsMessages from '../messages/errorsMessages.mjs';


/**
 * Represents a custom error class.
 */
class CustomError extends Error {
    /**
     * Constructor.
     *
     * @param {number} code - The error code.
     * @param {any} data - Additional data associated with the error.
     */
    constructor(code, data) {
        const message = customErrorsMessages[code];
        super(message);

        this.code = code;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}


export default CustomError;
