'use strict';

const userSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        username: {
            type: 'string',
            minLength: 1
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 1
        },
        password: {
            type: 'string',
            minLength: 8,
            format: 'password'
        },
        oldPassword: {
            type: 'string',
            minLength: 8,
            format: 'password'
        },
        newPassword: {
            type: 'string',
            minLength: 8,
            format: 'password'
        }
    }
};


export default userSchema;
