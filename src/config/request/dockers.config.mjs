// ================================================
// VALIDATORS
// ================================================

const postDockersValidator = {
    type: 'object',
    required: ['id', 'userId', 'modelName'],
    additionalProperties: false,
    properties: {
        id: {
            type: 'string',
        },
        userId: {
            type: 'string',
        },
        modelName: {
            type: 'string',
        },
    },
};

// ================================================
// ROUTE CONFIGS
// ================================================

const dockersConfig = {
    create: {
        POST: {
            validator: postDockersValidator,
            authentication: {
                required: true,
                isUserCredentialsRequired: true
            },
            authorization: {
                required: false,
            }
        },
    },
};


export default dockersConfig;
