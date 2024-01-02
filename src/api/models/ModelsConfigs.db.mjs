'use strict';

import AbstractDB from '../../db/AbstractDB.mjs';
import { modelsModelConfig } from './Models.configs.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModel);
        this.id = id;
    }

// ********** GET **********

    // async findOne(query, projections = {}, options = {}) {
    //     try {
    //         return await super.findOne(modelsModel, query, projections, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

    // async find(query, projections = {}, options = {}) {
    //     try {
    //         return await super.find(modelsModel, query, projections, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(modelsModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

    // async createMany(data, options = {}) {
    //     try {
    //         return await super.createMany(modelsModel, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** PUT **********

    // async updateOne(query, data, options = {}) {
    //     try {
    //         return await super.updateOne(modelsModel, query, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** DELETE **********

    // async deleteOne(query, options = {}) {
    //     try {
    //         return await super.deleteOne(modelsModel, query, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }
}
