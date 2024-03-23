import routeTest from '../utils/responseTest.mjs';


const usetTest1 = {
    username: 'usetTest1',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest1@test.test'
};

const usetTest2 = {
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'testLoginEmailNotFound@test.test'
};

const usetTest3 = {
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest1@test.test'
};


const path = '/api/login';
const method = 'post';
describe(`${method} ${path}`, () => {
    // wait 10 seconds for the register test to finish and create the user
    beforeAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }, 15000);

    describe('Extra parameters in the request', () => {
        routeTest(method, path, usetTest1, { statusCode: 422 }, 1);
    });

    describe('Email not found', () => {
        routeTest(method, path, usetTest2, { statusCode: 404 }, 1);
    });

    describe('User login success', () => {
        routeTest(method, path, usetTest3, { statusCode: 200 });
    });
});
