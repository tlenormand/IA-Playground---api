/* global CustomError */

import requestConfig from '../config/request/index.mjs';


/**
 * Retrieves the request configuration for a given endpoint path and HTTP method.
 *
 * @param {string} path - The endpoint path.
 * @param {string} method - The HTTP method (e.g., GET, POST).
 *
 * @returns {object} The request configuration object for the specified endpoint and method.
 */
const getRequestConfig = (path, method) => {
    // no url given
    if (!path) { throw new CustomError(404_013); }
    const paths = path.split('/').slice(1);

    // no method given
    if (!method) { throw new CustomError(404_014); }
    const formattedMethod = method.toUpperCase();

    let requestedConfig = requestConfig;

    // iterate over the paths to find the correct requestConfig for the endpoint
    for (const path of paths) {
        // no config for path
        if (!requestedConfig[path]) { throw new CustomError(404_015); }

        requestedConfig = requestedConfig[path];
    }

    // no config for method
    if (!requestedConfig[formattedMethod]) { throw new CustomError(404_016); }

    return requestedConfig[formattedMethod];
};


export default getRequestConfig;
