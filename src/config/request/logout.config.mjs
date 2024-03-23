// ================================================
// VALIDATORS
// ================================================

const getLogoutValidator = {
    type: 'object',
    required: [],
    additionalProperties: false,
};

// ================================================
// ROUTE CONFIGS
// ================================================

const logoutConfig = {
    GET: {
        validator: getLogoutValidator,
        authentication: {
            required: false
        },
        authorization: {
            required: false,
            roles: []
        }
    }
};


export default logoutConfig;
