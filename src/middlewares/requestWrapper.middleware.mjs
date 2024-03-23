import { responseHandler } from '../middlewares/index.mjs';


/**
 * Wraps a request handler callback with error handling and response handling.
 *
 * @param {function} callback - The callback function to be executed.
 *
 * @returns {function} A middleware function that handles the request and response.
 */
const requestWrapper = (callback) => {
    return async (req, res, next) => {
        try {
            responseHandler(await callback(req, res, next), req, res, next);
        } catch (err) {
            responseHandler(err, req, res, next);
        }
    };
}


export default requestWrapper;
