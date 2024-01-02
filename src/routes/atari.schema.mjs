'use strict';

const atariSchema = {
    env: {
        create: {
            type: 'object',
            required: ['game', 'modelName', 'userId', 'players'],
            additionalProperties: false,
            properties: {
                game: { type: 'string' },
                userId: { type: 'string' },
                modelName: { type: 'string' },
                players: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['type', 'name', 'atariConfig', 'modelConfig', 'dockerConfig'],
                        additionalProperties: false,
                        properties: {
                            type: { type: 'string' },
                            name: { type: 'string' },
                            atariConfig: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    game: { type: 'string' },
                                    epsilon: { type: 'number' },
                                    epsilonMin: { type: 'number' },
                                    canRender: { type: 'boolean' },
                                    canTrain: { type: 'boolean' },
                                },
                                required: ['game', 'epsilon', 'epsilonMin', 'canRender', 'canTrain'],
                            },
                            modelConfig: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    modelName: { type: 'string' },
                                    modelPath: { type: 'string' },
                                    canLoadModel: { type: 'boolean' },
                                    canSaveModel: { type: 'boolean' },
                                    canContainerize: { type: 'boolean' },
                                },
                                required: ['modelName', 'modelPath', 'canLoadModel', 'canSaveModel', 'canContainerize'],
                            },
                            dockerConfig: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    canContainerize: { type: 'boolean' },
                                },
                                required: ['canContainerize'],
                            },
                            logsConfig: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    canSaveLogs: { type: 'boolean' },
                                    canSendLogs: { type: 'boolean' },
                                },
                                required: ['canSaveLogs', 'canSendLogs'],
                            },
                        },
                    },
                },
            },
        },
        step: {
            type: 'object',
            required: ['userId', 'players'],
            additionalProperties: false,
            properties: {
                userId: { type: 'string' },
                players: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['name'],
                        additionalProperties: false,
                        properties: {
                            name: { type: 'string' },
                            action: { type: 'integer' },
                        },
                    },
                },
            },
        },
        reset: {
            type: 'object',
            required: ['userId', 'reset', 'players'],
            additionalProperties: false,
            properties: {
                userId: { type: 'string' },
                reset: { type: 'boolean' },
                players: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['name'],
                        additionalProperties: false,
                        properties: {
                            name: { type: 'string' },
                        },
                    },
                }
            },
        },
        train: {
            start: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    modelName: { type: 'string' },
                    atariConfig: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            game: { type: 'string' },
                            epsilon: { type: 'number' },
                            epsilonMin: { type: 'number' },
                            canRender: { type: 'boolean' },
                            canTrain: { type: 'boolean' },
                            canSaveLogs: { type: 'boolean' },
                            canSendLogs: { type: 'boolean' },
                        },
                        required: ['game', 'epsilon', 'epsilonMin', 'canRender', 'canTrain', 'canSaveLogs', 'canSendLogs'],
                    },
                    dockerConfig: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            modelPath: { type: 'string' },
                            canLoadModel: { type: 'boolean' },
                            canSaveModel: { type: 'boolean' },
                            canContainerize: { type: 'boolean' },
                        },
                        required: ['modelPath', 'canLoadModel', 'canSaveModel', 'canContainerize'],
                    },
                },
                required: ['userId', 'modelName', 'atariConfig', 'dockerConfig'],
                additionalProperties: false,
            },
            stop: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    modelName: { type: 'string' },
                    dockerConfig: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            modelPath: { type: 'string' },
                            canLoadModel: { type: 'boolean' },
                            canSaveModel: { type: 'boolean' },
                            canContainerize: { type: 'boolean' },
                        },
                        required: ['modelPath', 'canLoadModel', 'canSaveModel', 'canContainerize'],
                    },
                },
                required: ['userId', 'modelName'],
                additionalProperties: false,
            },
        }
    },
}


export default atariSchema;
