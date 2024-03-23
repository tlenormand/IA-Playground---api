import { ObjectId } from 'mongodb';


/**
 * Converts camelCase keys in an object or array to snake_case.
 *
 * @param {object|array} data - The data to convert.
 *
 * @returns {object|array} The data with camelCase keys converted to snake_case.
 */
const camelCaseToSnakeCase = (data) => {
    if (data instanceof Date) { return data; }
    if (data instanceof ObjectId) { return data; }

    if (Array.isArray(data)) {
        return data.map(item => camelCaseToSnakeCase(item));
    } else if (typeof data === 'object' && data !== null) {
        const result = {};

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = camelCaseToSnakeCase(data[key]);
            }
        }

        return result;
    } else {
        return data;
    }
};


export default camelCaseToSnakeCase;
