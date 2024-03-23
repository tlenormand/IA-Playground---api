import { customSuccessMessages, customErrorsMessages } from '../messages/index.mjs';


/**
 * Formats a response object.
 *
 * @param {object} response - The response object to format.
 *
 * @returns {object} The formatted response object.
 */
const formatResponse = (response) => {
    const { code, data, success, ...other } = response;

    return {
        success: success,
        code: code,
        data: data,
        message: response.success ? customSuccessMessages[code] : customErrorsMessages[code],
        lostData: Object.keys(other).length !== 0 ? true : undefined
    };
};


export default formatResponse;
