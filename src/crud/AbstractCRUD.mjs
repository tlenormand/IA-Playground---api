/**
 * Represents a base class for performing CRUD operations.
 */
class AbstractCRUD {
    /**
     * Constructor.
     *
     * @param {string} baseUrl - The base URL for the CRUD operations.
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * Performs a POST request to create a new resource.
     *
     * @param {string} endpoint - The endpoint for the POST request.
     * @param {object} data - The data to be sent in the request body.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async post(endpoint, data) {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    /**
     * Performs a GET request to retrieve a resource or resources.
     *
     * @param {string} endpoint - The endpoint for the GET request.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async get(endpoint) {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url);
        return response.json();
    }

    /**
     * Performs a PUT request to update an existing resource.
     *
     * @param {string} endpoint - The endpoint for the PUT request.
     * @param {object} data - The data to be sent in the request body.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async put(endpoint, data) {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    /**
     * Performs a DELETE request to delete an existing resource.
     *
     * @param {string} endpoint - The endpoint for the DELETE request.
     *
     * @returns {Promise<object>} A promise resolving to the response data.
     */
    async delete(endpoint) {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return response.json();
    }
}

export default AbstractCRUD;
