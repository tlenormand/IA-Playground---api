'use strict';


class AbstractCRUD {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

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

    async get(endpoint) {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url);
        return response.json();
    }

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

    async delete(endpoint) {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return response.json();
    }
}

export default AbstractCRUD;
