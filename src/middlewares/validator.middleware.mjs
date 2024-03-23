/* global CustomError */

import Ajv from '../utils/Ajv.mjs';

import getRequestConfig from '../utils/getRequestConfig.mjs';


/**
 * Validating request data based on endpoint configurations.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express middleware chain.
 *
 * @returns {function} - The next middleware function.
 */
const validatorMiddleware = (req, res, next) => {
    let validatorConfig = getRequestConfig(req.path, req.method);

    validatorConfig = validatorConfig.validator;
    // Validator is missing
    if (!validatorConfig) { throw new CustomError(404_008); }

    const ajv = new Ajv(validatorConfig);
    const error = ajv.validate(req.body);

    // Validation error
    if (error) { throw new CustomError(422_000, error); }

    // Body should not contain user object (used when authentication)
    if (req.body.userCredentials) { throw new CustomError(422_002, req.body.userCredentials); }

    return next();
};


export default validatorMiddleware;
