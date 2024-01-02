'use strict';

import mongoose from "mongoose";


const logsSchema = new mongoose.Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        select: true
    },
    __v: {
        type: Number,
        select: false
    },
}, { timestamps: true, strict: false });

const logsModel = mongoose.model('Logs', logsSchema, 'logs');


export {
    logsSchema,
    logsModel
};
