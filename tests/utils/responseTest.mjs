import request from 'supertest';


/**
 * Execute tests for a route.
 * @param {string} method - The HTTP method for the route (e.g., 'GET', 'POST').
 * @param {string} path - The endpoint path for the route.
 * @param {object} requestData - The request data to be sent to the route (default: {}).
 * @param {object} responseData - The expected response data from the route (default: {}).
 * @param {number} stop - Indicates whether to stop the tests prematurely after a specific status code (default: undefined).
 *                         If set to 1, the tests will stop after the status code.
 */
export default routeTest = (method, path, requestData={}, responseData={}, stop=undefined) => {
    let response;

    beforeAll(async () => {
        if (method === 'get') response = await request(__BASEURL__).get(path);
        if (method === 'post') response = await request(__BASEURL__).post(path).send(requestData);
        if (method === 'put') response = await request(__BASEURL__).put(path).send(requestData);
        if (method === 'delete') response = await request(__BASEURL__).delete(path);
    });

    describe(`${method} ${path}`, () => {
        test(`Should return a ${responseData.statusCode || 200} status code`, () => {
            expect(response.status).toBe(responseData.statusCode || 200);
        });

        if (stop === 1) return;

        test('Should return JSON', async () => {
            expect(response.headers['content-type']).toMatch(/application\/json/);
        });

        describe('Success property', () => {
            test('Should be present', async () => {
                expect(response.body).toHaveProperty('success');
            });

            test('Should be a boolean', async () => {
                expect(typeof response.body.success).toBe('boolean');
            });
        });

        describe('Code property', () => {
            test('Should be present', async () => {
                expect(response.body).toHaveProperty('code');
            });

            test('Should be a number', async () => {
                expect(typeof response.body.code).toBe('number');
            });
        });

        describe('data property', () => {
            test('Should be present', async () => {
                expect(response.body).toHaveProperty('data');
            });

            test('Should be an object', async () => {
                expect(typeof response.body.data).toBe('object');
            });
        });

        describe('Message property', () => {
            test('should be present', async () => {
                expect(response.body).toHaveProperty('message');
            });

            test('Should be a string', async () => {
                expect(typeof response.body.message).toBe('string');
            });
        });

        test('No other properties should be present', async () => {
            expect(Object.keys(response.body).length).toBe(4);
        });
    });
}
