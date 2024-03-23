/* global CustomError */

import getRequestConfig from '../utils/getRequestConfig.mjs';


/**
 * Middleware function to handle authentication.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {function} - The next middleware function.
 */
const authenticationMiddleware = (req, res, next) => {
    let authenticationConfig = getRequestConfig(req.path, req.method);

    authenticationConfig = authenticationConfig.authentication;
    // authentication is missing
    if (!authenticationConfig) { throw new CustomError(404_010); }

    if (authenticationConfig.required) {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) { throw new CustomError(401_002); }

        if (authenticationConfig.isUserCredentialsRequired) {
            // Add credentials to the request body
            req.body = { ...req.body, userCredentials: req.user._doc };
        }
    }

    return next();
};


export default authenticationMiddleware;
