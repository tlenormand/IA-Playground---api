'use strict';

import mongoose from "mongoose";


const modelsLayersSchema = new mongoose.Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        select: true
    },
    __v: {
        type: Number,
        select: false
    },
}, { timestamps: true, strict: false });

const modelsModelLayer = mongoose.model('ModelsLayers', modelsLayersSchema, 'models.layers');


export {
    modelsLayersSchema,
    modelsModelLayer
};
