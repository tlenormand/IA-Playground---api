/* global CustomError */

import passport from 'passport';

import AbstractAPI from '../api/AbstractApi.mjs';
import { formatAuthInfo } from '../formatter/index.mjs';
import UserController from './User.controller.mjs';
import userModel from '../api/users/User.schema.mjs';


/**
 * Controller class for handling user login operations.
 *
 * @extends AbstractAPI
 */
export default class LoginController extends AbstractAPI {
    /**
     * Constructor.
     */
    constructor() {
        super();
    }

    /**
     * Middleware for handling user login.
     *
     * @returns {function} Express middleware function.
     */
    async loginMiddleware(req, res, next) {
        const user = await this._isAuthenticated(req, res, next);
        if (user) { throw new CustomError(409_001, user); }

        try {
            return await this._authenticate(req, res, next);
        } catch (err) {
            throw new CustomError(500_000, err);
        }
    }

    /**
     * Checks if the user is authenticated.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {function} next - The next middleware function.
     *
     * @returns {Object|boolean} The user data if authenticated, otherwise false.
     */
    async _isAuthenticated(req) {
        if (req.isAuthenticated()) {
            return {
                email: req.user.email,
                username: req.user.username,
                role: req.user.role,
                language: req.user.language,
            };
        }

        return false;
    }

    /**
     * Handles authentication failure.
     *
     * @param {string} email - The user's email.
     * @param {Object} info - Information about the authentication failure.
     *
     * @returns {Object} The error code and data.
     */
    async _authenticationFailed(email, info) {
        const userfailed = await userModel.findOne({ email });
        if (!userfailed) { return { code: 404_003, data: { user: { email }}}; }

        const formattedAuthInfo = formatAuthInfo(userfailed, info);
        const errorCodes = {
            MissingPasswordError: 404_003,
            MissingUsernameError: 404_003,
            IncorrectPasswordError: 404_012,
            UserExistsError: 409_003,
            AttemptTooSoonError: 429_001,
            TooManyAttemptsError: 429_002
        };

        return { code: errorCodes[info.name] || 500_000, data: formattedAuthInfo };
    }

    /**
     * Handles authentication success.
     *
     * @param {Object} req - The request object.
     * @param {Object} user - The authenticated user object.
     *
     * @returns {Object} The success code and data.
     */
    async _authenticationSuccess(req, user) {
        return await new UserController().login(req, user);
    }

    /**
     * Authenticates user credentials.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {function} next - The next middleware function.
     *
     * @returns {Promise<Object>} A promise resolving to the authentication result.
     */
    async _authenticate(req, res, next) {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', async (error, user, info) => {
                try {
                    if (error) { resolve({ code: 500_000, data: error }); }

                    const result = user ?
                        await this._authenticationSuccess(req, user) :
                        await this._authenticationFailed(req.query.email, info);

                    resolve(result);
                } catch (err) {
                    reject({ code: 500_000, data: err });
                }
            })(req, res, next);
        });
    }
}
