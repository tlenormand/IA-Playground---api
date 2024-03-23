import routeTest from '../utils/responseTest.mjs';


const path = '/api/info/get_alive';
const method = 'get';
describe(`${method} ${path}`, () => {
    routeTest(method, path);
});
