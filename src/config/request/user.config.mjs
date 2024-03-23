// ================================================
// VALIDATORS
// ================================================

const postUserValidator = {
    type: ["object", "array"],
    required: [],
    additionalProperties: false,
    properties: {
        username: {
            type: 'string',
            minLength: 1
        },
        language: {
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
        }
    }
};

const getUserValidator = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {}
};

const putUserValidator = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {
        username: {
            type: 'string',
            minLength: 1
        },
        language: {
            type: 'string',
            minLength: 1
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 1
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

const deleteUserValidator = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {}
};


// ================================================
// ROUTE CONFIGS
// ================================================

const userConfig = {
    POST: {
        validator: postUserValidator,
        authentication: {
            required: true
        },
        authorization: {
            required: true,
            roles: ['god', 'super']
        }
    },
    GET: {
        validator: getUserValidator,
        authentication: {
            required: true
        },
        authorization: {
            required: true,
            roles: ['god', 'super', 'admin']
        }
    },
    PUT: {
        validator: putUserValidator,
        authentication: {
            required: true
        },
        authorization: {
            required: false
        }
    },
    DELETE: {
        validator: deleteUserValidator,
        authentication: {
            required: true
        },
        authorization: {
            required: false
        }
    }
};


export default userConfig;
