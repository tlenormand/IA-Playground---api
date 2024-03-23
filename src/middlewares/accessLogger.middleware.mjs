const normal = '\x1b[0m';
const yellowBackground = '\x1b[43m';
const greenBackground = '\x1b[42m';
const greenFont = '\x1b[32m';
const redFont = '\x1b[31m';
const yellowFont = '\x1b[33m';


/**
 * Determines the color for logging based on HTTP status code.
 *
 * @param {number} statusCode - The HTTP status code.
 *
 * @returns {string} - The color code for logging.
 */
const _statusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
        // Success codes (2xx)
        return greenFont;
    } else if (statusCode >= 300 && statusCode < 400) {
        // Redirection codes (3xx)
        return yellowFont;
    } else if (statusCode >= 400 && statusCode < 500) {
        // Client errors (4xx)
        return redFont;
    } else if (statusCode >= 500) {
        // Server errors (5xx)
        return redFont;
    } else {
        // Other cases
        return normal;
    }
};


/**
 * Middleware function for logging access to API endpoints.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {function} - The next middleware function.
 */
const accessLoggerMiddleware = (req, res, next) => {
    const startDate = new Date();
    const method = req.method;
    const url = req.url;

    Global.log(`[${startDate.toISOString()}]${yellowBackground}[API${normal}|${method}|'${url}'][${req.user?.id || undefined}|${req.user?.username || undefined}|${req.user?.role || undefined}]`);

    res.on('finish', () => {
        Global.log(`${greenBackground}[RESPONSE]${normal}: ${_statusColor(res.statusCode)}[${res.statusCode}]${normal} on ${new Date() - startDate}ms`);
    });

    return next();
};


export default accessLoggerMiddleware;
