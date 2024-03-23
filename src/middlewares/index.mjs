import accessLoggerMiddleware from './accessLogger.middleware.mjs';
import AuthenticationMiddleware from './authentication.middleware.mjs';
import authorizationMiddleware from './authorization.middleware.mjs';
// import corsMiddleware from './cors.middleware.mjs';
import requestWrapper from './requestWrapper.middleware.mjs';
import responseHandler from './response.middleware.mjs';
import validatorMiddleware from './validator.middleware.mjs';

export {
    accessLoggerMiddleware,
    AuthenticationMiddleware,
    authorizationMiddleware,
    // corsMiddleware,
    requestWrapper,
    responseHandler,
    validatorMiddleware
};
