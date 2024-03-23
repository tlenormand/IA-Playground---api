// ================================================
// VALIDATORS
// ================================================

const postLoginValidator = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {}
};

// ================================================
// ROUTE CONFIGS
// ================================================

const loginConfig = {
    POST: {
        validator: postLoginValidator,
        authentication: {
            required: false
        },
        authorization: {
            required: false,
            roles: []
        }
    }
};


export default loginConfig;
