import routeTest from '../utils/responseTest.mjs';
import mongoDB from '../../src/db/MongoDB.mjs';


const usetTest1 = {
    username: 'usetTest1',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest1@test.test'
};

const usetTest2 = {
    username: 'usetTest1',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest2@test.test'
};

const usetTest3 = {
    username: 'usetTest3',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest1@test.test'
};

const usetTest4 = {
    username: '平和',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest4@test.test'
};

const usetTest5 = {
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest5@test.test'
};

const usetTest6 = {
    username: 'usetTest6',
    password: 'Ry#Q9',
    email: 'usetTest6@test.test'
};

const usetTest7 = {
    username: 'usetTest7',
    email: 'usetTest7@test.test'
};

const usetTest8 = {
    username: 'usetTest8',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
    email: 'usetTest8'
};

const usetTest9 = {
    username: 'usetTest9',
    password: 'yn%"K]8W};x?=A=Z"\'r0H+f4lGSIJA=0p!£_h&#.{eyE~Ry#Q9',
};


const path = '/api/register';
const method = 'post';
describe(`${method} ${path}`, () => {
    describe('User registration success', () => {
        routeTest(method, path, usetTest1, { statusCode: 201 });

        test('Should create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest1.email });
            expect(user).toBeTruthy();
        });
    });

    describe('User registration success with username already exist', () => {
        routeTest(method, path, usetTest2, { statusCode: 201 }, 1);

        test('Should create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest2.email });
            expect(user).toBeTruthy();
        });
    });

    describe('User registration failure: email already exists', () => {
        routeTest(method, path, usetTest3, { statusCode: 500 }, 1);

        test('Should not create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ username: usetTest3.username });
            expect(user).toBeFalsy();
        });
    });

    describe('User registration success with complex username', () => {
        routeTest(method, path, usetTest4, { statusCode: 201 }, 1);

        test('Should create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest4.email });
            expect(user).toBeTruthy();
        });
    });

    describe('User registration failure: username missing', () => {
        routeTest(method, path, usetTest5, { statusCode: 422 }, 1);

        test('Should not create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest5.email });
            expect(user).toBeFalsy();
        });
    });

    describe('User registration failure: password too short', () => {
        routeTest(method, path, usetTest6, { statusCode: 422 }, 1);

        test('Should not create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest6.email });
            expect(user).toBeFalsy();
        });
    });

    describe('User registration failure: password missing', () => {
        routeTest(method, path, usetTest7, { statusCode: 422 }, 1);

        test('Should not create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest7.email });
            expect(user).toBeFalsy();
        });
    });

    describe('User registration failure: email invalid', () => {
        routeTest(method, path, usetTest8, { statusCode: 422 }, 1);

        test('Should not create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest8.email });
            expect(user).toBeFalsy();
        });
    });

    describe('User registration failure: email missing', () => {
        routeTest(method, path, usetTest9, { statusCode: 422 }, 1);

        test('Should not create a new user in the database', async () => {
            const user = await mongoDB.db.collection('users').findOne({ email: usetTest9.email });
            expect(user).toBeFalsy();
        });
    });
});
