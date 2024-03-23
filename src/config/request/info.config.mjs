// ================================================
// VALIDATORS
// ================================================

const getAliveValidator = {
    type: 'object',
    required: [],
    additionalProperties: false,
};

// ================================================
// ROUTE CONFIGS
// ================================================

const infoConfig = {
    get_alive: {
        GET: {
            validator: getAliveValidator,
            authentication: {
                required: false
            },
            authorization: {
                required: false 
            }
        }
    }
};


export default infoConfig;
