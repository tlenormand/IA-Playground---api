import camelCaseToSnakeCase from '../utils/camelCaseToSnakeCase.mjs';


/**
 * Formats data for creating an Atari model post request.
 *
 * @param {object} data - The data object containing model configuration.
 *
 * @returns {object} The formatted data object with model name in snake_case.
 */
const formatAtariModelCreatePost = (data) => {
    const newData = {
        ...data,
        modelName: data.modelConfig.modelName
    };

    return camelCaseToSnakeCase(camelCaseToSnakeCase(newData));
};

/**
 * Formats data for deleting an Atari model post request.
 *
 * @param {object} body - The body data of the request.
 * @param {object} query - The query parameters of the request.
 *
 * @returns {object} The formatted data object with keys in snake_case.
 */
const formatAtariModelDeletePost = (body, query) => {
    const data = {
        ...body,
        ...query,
    };

    return camelCaseToSnakeCase(data);
};

/**
 * Formats data for a post request related to running a model in Docker.
 *
 * @param {object} body - The body data of the request.
 * @param {object} query - The query parameters of the request.
 *
 * @returns {object} The formatted data object with keys in snake_case.
 */
const formatModelDockerRunningPost = (body, query) => {
    const data = {
        ...body,
        ...query,
    };

    return camelCaseToSnakeCase(data);
};


export {
    formatAtariModelCreatePost,
    formatAtariModelDeletePost,
    formatModelDockerRunningPost,
};
