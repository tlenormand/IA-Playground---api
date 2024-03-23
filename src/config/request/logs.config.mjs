// ================================================
// VALIDATORS
// ================================================

const postLogsValidator = {
    type: 'object',
    required: [],
    additionalProperties: true,
    properties: {}
};

const getGetLogsValidator = {
    type: 'object',
    required: [],
    additionalProperties: true,
    properties: {}
};

const getFindLogsStatsValidator = {
    type: 'object',
    required: [],
    additionalProperties: true,
    properties: {}
};

const getLogsStatsValidator = {
    type: 'object',
    required: ['userId', 'modelName'],
    additionalProperties: false,
    properties: {
        userId: { type: 'string' },
        modelName: { type: 'string' },
    },
};

const postLogsStatsValidator = {
    type: 'object',
    required: [],
    additionalProperties: true,
    properties: {}
};

// ================================================
// ROUTE CONFIGS
// ================================================

const logsConfig = {
    create: {
        POST: {
            validator: postLogsValidator,
            authentication: {
                required: false
            },
            authorization: {
                required: false,
            }
        },
    },
    get: {
        GET: {
            validator: getGetLogsValidator,
            authentication: {
                required: true
            },
            authorization: {
                required: false,
            }
        },
    },
    find: {
        POST: {
            validator: getFindLogsStatsValidator,
            authentication: {
                required: false
            },
            authorization: {
                required: false,
            }
        },
    },
    stats: {
        GET: {
            validator: getLogsStatsValidator,
            authentication: {
                required: true
            },
            authorization: {
                required: false,
            }
        },
        POST: {
            validator: postLogsStatsValidator,
            authentication: {
                required: false
            },
            authorization: {
                required: false,
            }
        },
    },
};


export default logsConfig;
