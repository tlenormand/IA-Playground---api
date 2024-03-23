// ================================================
// VALIDATORS
// ================================================

// ================================================
// ROUTE CONFIGS
// ================================================

const modelsConfig = {
    POST: {
        validator: {
            type: 'object',
            // required: ['dockerInstance', 'model', 'modelConfig', 'modelLayers'],
            additionalProperties: true,
            // properties: {
            //     dockerInstance: {
            //         type: 'object',
            //     },
            //     model: {
            //         type: 'object',
            //     },
            //     modelConfig: {
            //         type: 'object',
            //     },
            //     modelLayers: {
            //         type: 'object',
            //     }
            // }
        },
        authentication: {
            required: true,
            isUserCredentialsRequired: true
        },
        authorization: {
            required: false,
        }
    },
    GET: {
        validator: {
            type: 'object',
            required: [],
            additionalProperties: true,
            properties: {}
        },
        authentication: {
            required: true,
            isUserCredentialsRequired: true
        },
        authorization: {
            required: false,
        }
    },
    DELETE: {
        validator: {
            type: 'object',
            required: [],
            additionalProperties: false,
            properties: {}
        },
        authentication: {
            required: true,
            isUserCredentialsRequired: true
        },
        authorization: {
            required: false,
        }
    },
};


export default modelsConfig;
