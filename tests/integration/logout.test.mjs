import routeTest from '../utils/responseTest.mjs';


const usetTest1 = {
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest1@test.test'
};


const path = '/api/logout';
const method = 'get';
describe(`${method} ${path}`, () => {
    // wait 20 seconds for the login test to finish and log in the user
    beforeAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20000));
    }, 25000);

    describe('Extra parameters in the request', () => {
        routeTest('post', '/api/login', usetTest1, { statusCode: 200 }, 1);
        routeTest(method, path, usetTest1, { statusCode: 200 });
    });
});
