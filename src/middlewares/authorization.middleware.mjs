/* global CustomError */

import getRequestConfig from '../utils/getRequestConfig.mjs';


//==========================================================================
// ROLES
//==========================================================================
//
// god: 0
// super: 1
// admin: 2
// user: 3
//==========================================================================


/**
 * Middleware for authorization.
 * Checks if the user has the required role for accessing a specific route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {function} - The next middleware function.
 */
const authorizationMiddleware = (req, res, next) => {
    let authorizationConfig = getRequestConfig(req.path, req.method);

    authorizationConfig = authorizationConfig.authorization;
    // Authorization is missing
    if (!authorizationConfig) { throw new CustomError(404_009); }

    if (authorizationConfig.required) {
        // Roles are missing
        if (!authorizationConfig.roles) { throw new CustomError(404_011); }

        // forbidden
        if (!authorizationConfig.roles.includes(req.user.role)) { throw new CustomError(403_001); }
    }

    return next();
};


export default authorizationMiddleware;
