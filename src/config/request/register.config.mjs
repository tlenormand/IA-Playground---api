// ================================================
// VALIDATORS
// ================================================

const postRegisterValidator = {
    type: 'object',
    required: ['email', 'password', 'username'],
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
        },
        username: {
            type: 'string',
            minLength: 1
        },
        language: {
            type: 'string',
            minLength: 1
        }
    }
};

// ================================================
// ROUTE CONFIGS
// ================================================

const registerConfig = {
    POST: {
        validator: postRegisterValidator,
        authentication: {
            required: false
        },
        authorization: {
            required: false
        }
    }
};


export default registerConfig;
