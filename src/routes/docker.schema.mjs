'use strict';

const dockerSchema = {
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
    }
};


export default dockerSchema;
