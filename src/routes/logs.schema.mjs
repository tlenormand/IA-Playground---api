'use strict';

const logsSchema = {
    get: {
        type: 'object',
        required: ['userId', 'modelName'],
        additionalProperties: false,
        properties: {
            userId: {
                type: 'string',
            },
            modelName: {
                type: 'string',
            },
        }
    },
    create: {
        type: 'object',
        required: [],
        additionalProperties: true,
        properties: {}
    },
    find: {
        type: 'object',
        required: [],
        additionalProperties: true,
        properties: {}
    },
    stats: {
        GET: {
            type: 'object',
            required: ['userId', 'modelName'],
            additionalProperties: false,
            properties: {
                userId: { type: 'string' },
                modelName: { type: 'string' },
            }
        },
        POST: {
            type: 'object',
            required: ['userId', 'modelName'],
            additionalProperties: false,
            properties: {
                userId: { type: 'string' },
                modelName: { type: 'string' },
            }
        },
    },
};


export default logsSchema;
