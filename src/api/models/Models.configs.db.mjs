'use strict';

import AbstractDB from '../../db/AbstractDB.mjs';
import { modelsModelConfig } from './Models.configs.schema.mjs';
import DockersDB from '../dockers/Dockers.db.mjs';
import ModelsLayersDB from './Models.layers.db.mjs';
import LogsDB from '../logs/Logs.db.mjs';
import ModelDb from './Models.db.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModelConfig);
        this.id = id;
    }

// ********** GET **********

    async findOne(query, projections = {}, options = {}) {
        try {
            return await super.findOne(modelsModelConfig, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

    async find(query, projections = {}, options = {}) {
        try {
            return await super.find(modelsModelConfig, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(modelsModelConfig, data, options);
        } catch (err) {
            _log(err)
        }
    }

    // async createMany(data, options = {}) {
    //     try {
    //         return await super.createMany(modelsModelConfig, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** PUT **********

    // async updateOne(query, data, options = {}) {
    //     try {
    //         return await super.updateOne(modelsModelConfig, query, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** DELETE **********

    async deleteOne(query, options = {}) {
        try {
            return await super.deleteOne(modelsModelConfig, query, options);
        } catch (err) {
            _log(err)
        }
    }
}
