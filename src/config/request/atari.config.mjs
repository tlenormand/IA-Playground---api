// ================================================
// VALIDATORS
// ================================================

const postAtariValidator = {
    type: 'object',
    required: ['game', 'modelName', 'players'],
    additionalProperties: false,
    properties: {
        game: { type: 'string' },
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
};

const postAtariStepValidator = {
    type: 'object',
    required: ['players'],
    additionalProperties: false,
    properties: {
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
};

const postAtariResetValidator = {
    type: 'object',
    required: ['reset', 'players'],
    additionalProperties: false,
    properties: {
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
        },
    },
};

const postAtariDestroyValidator = {
    type: 'object',
    required: ['game', 'modelName', 'players'],
    additionalProperties: false,
    properties: {
        game: { type: 'string' },
        modelName: { type: 'string' },
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
        },
    },
};

const postAtariTrainStartValidator = {
    type: 'object',
    required: ['modelName', 'atariConfig', 'dockerConfig'],
    additionalProperties: false,
    properties: {
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
};

const postAtariTrainStopValidator = {
    type: 'object',
    required: ['modelName', 'dockerConfig'],
    additionalProperties: false,
    properties: {
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
};

// ================================================
// ROUTE CONFIGS
// ================================================

const atariConfig = {
    POST: {
        validator: postAtariValidator,
        authentication: {
            required: true,
            isUserCredentialsRequired: true
        },
        authorization: {
            required: false,
        }
    },
    step: {
        POST: {
            validator: postAtariStepValidator,
            authentication: {
                required: true,
                isUserCredentialsRequired: true
            },
            authorization: {
                required: false,
            }
        },
    },
    reset: {
        POST: {
            validator: postAtariResetValidator,
            authentication: {
                required: true,
                isUserCredentialsRequired: true
            },
            authorization: {
                required: false,
            }
        },
    },
    destroy: {
        POST: {
            validator: postAtariDestroyValidator,
            authentication: {
                required: true,
                isUserCredentialsRequired: true
            },
            authorization: {
                required: false,
            }
        },
    },
    train: {
        start: {
            POST: {
                validator: postAtariTrainStartValidator,
                authentication: {
                    required: true,
                    isUserCredentialsRequired: true
                },
                authorization: {
                    required: false,
                }
            },
        },
        stop: {
            POST: {
                validator: postAtariTrainStopValidator,
                authentication: {
                    required: true,
                    isUserCredentialsRequired: true
                },
                authorization: {
                    required: false,
                }
            },
        },
    },
};

const atariConfigs = {
    env: {
        create: {
            type: 'object',
            required: ['game', 'modelName', 'players'],
            additionalProperties: false,
            properties: {
                game: { type: 'string' },
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
            required: ['players'],
            additionalProperties: false,
            properties: {
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
            required: ['reset', 'players'],
            additionalProperties: false,
            properties: {
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
                required: ['modelName', 'atariConfig', 'dockerConfig'],
                additionalProperties: false,
                properties: {
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
                }
            },
            stop: {
                type: 'object',
                required: ['userId', 'modelName'],
                additionalProperties: false,
                properties: {
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
            },
        }
    },
}


export default atariConfig;
