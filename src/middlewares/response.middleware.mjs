/* global CustomError */

import { formatResponse } from '../formatter/index.mjs';


/**
 * Logs the response data with color-coded formatting.
 *
 * @param {object} data - The response data to be logged.
 * @param {boolean} data.success - Indicates if the response was successful.
 * @param {number} data.code - The status code of the response.
 * @param {string} data.message - The message associated with the response.
 *
 * @returns {void}
 */
const logResponse = (data) => {
    const normal = '\x1b[0m';
    const green = '\x1b[32m';
    const red = '\x1b[31m';
    const backgroundGreen = '\x1b[42m';
    const backgroundRed = '\x1b[41m';

    if (data.success) {
        Global.log(`[${new Date().toISOString()}][${backgroundGreen}SUCCESS${normal}${green}|${data.code}${normal}] => ${data.message}`);
    } else {
        Global.log(`[${new Date().toISOString()}][${backgroundRed}ERROR${normal}${red}|${data.code}${normal}] => ${data.message}`);
    }
};

/**
 * Handles the response data and sends the response.
 *
 * @param {Object} responseData - The response data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 *
 * @returns {Object} The response object.
 */
const responseHandler = (responseData, req, res) => {
    if (!responseData) { responseData = new CustomError(500_999); }

    let succeededResponstData = responseData;

    const isError = responseData instanceof CustomError || responseData instanceof Error;
    const isCustomError = responseData instanceof CustomError;
    if (isError && !isCustomError) { succeededResponstData = new CustomError(500_999, responseData); }

    const statusCode = parseInt(succeededResponstData.code.toString().slice(0, 3));
    if (statusCode && statusCode > 199 && statusCode < 300) {
        succeededResponstData.success = true;
    } else {
        succeededResponstData.success = false;
        Global.logError(succeededResponstData);
    }

    const formattedResponseData = formatResponse(succeededResponstData);
    logResponse(formattedResponseData);

    return res.status(parseInt(statusCode)).json(formattedResponseData);
};


export default responseHandler;
