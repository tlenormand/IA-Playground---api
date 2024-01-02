'use strict';

import mongoose from "mongoose";


const modelsConfigsSchema = new mongoose.Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        select: true
    },
    __v: {
        type: Number,
        select: false
    },
}, { timestamps: true, strict: false });

const modelsModelConfig = mongoose.model('ModelsConfigs', modelsConfigsSchema, 'models.configs');


export {
    modelsConfigsSchema,
    modelsModelConfig
};
