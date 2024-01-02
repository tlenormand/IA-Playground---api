'use strict';

// ================================================================================
// @loggerMiddleware
// ================================================================================
// @description
// Middleware used to log the request and response
// ================================================================================
// @params
// req: object
// res: object
// next: function
// ================================================================================
// @return
// next: function
// ================================================================================
// @errors
// none
// ================================================================================
const loggerMiddleware = (req, res, next) => {
    const startDate = new Date();
    const method = req.method;
    const url = req.url;

    const normal = '\x1b[0m';
    const yellowBackground = '\x1b[43m';
    const greenBackground = '\x1b[42m';
    const greenFont = '\x1b[32m';
    const redFont = '\x1b[31m';
    const yellowFont = '\x1b[33m';

    _log(`${yellowBackground}[API]${normal}:[${startDate.toISOString()}]:${method}=>'${url}'`);

    const StatusColore = (statusCode) => {
        if (statusCode >= 200 && statusCode < 300) { // Success codes (2xx)
            return greenFont;
        } else if (statusCode >= 300 && statusCode < 400) { // Redirection codes (3xx)
            return yellowFont;
        } else if (statusCode >= 400 && statusCode < 500) { // Client errors (4xx)
            return redFont;
        } else if (statusCode >= 500) { // Server errors (5xx)
            return redFont;
        } else { // Other cases
            return normal;
        }
    }

    res.on('finish', () => {
        _log(`${greenBackground}[Response]${normal}: ${StatusColore(res.statusCode)}[${res.statusCode}]${normal} on ${new Date() - startDate}ms`);
    });

    next();
};


export default loggerMiddleware;
