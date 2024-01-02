'use strict';

const loginSchema = {
    type: 'object',
    required: ['email', 'password'],
    additionalProperties: false,
    properties: {
        email: {
            type: 'string',
            format: 'email',
            minLength: 1
        },
        password: {
            type: 'string',
            minLength: 8,
            format: 'password'
        }
    }
};


export default loginSchema;
