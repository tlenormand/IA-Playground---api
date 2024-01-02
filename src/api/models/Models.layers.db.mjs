'use strict';

import AbstractDB from '../../db/AbstractDB.mjs';
import { modelsModelLayer } from './Models.layers.schema.mjs';


export default class ModelsDB extends AbstractDB {
    constructor(id) {
        super(modelsModelLayer);
        this.id = id;
    }

// ********** GET **********

    // async findOne(query, projections = {}, options = {}) {
    //     try {
    //         return await super.findOne(modelsModelLayer, query, projections, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

    // async find(query, projections = {}, options = {}) {
    //     try {
    //         return await super.find(modelsModelLayer, query, projections, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(modelsModelLayer, data, options);
        } catch (err) {
            _log(err)
        }
    }

    // async createMany(data, options = {}) {
    //     try {
    //         return await super.createMany(modelsModelLayer, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** PUT **********

    // async updateOne(query, data, options = {}) {
    //     try {
    //         return await super.updateOne(modelsModelLayer, query, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** DELETE **********

    // async deleteOne(query, options = {}) {
    //     try {
    //         return await super.deleteOne(modelsModelLayer, query, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

    async deleteMany(query, options = {}) {
        try {
            return await super.deleteMany(modelsModelLayer, query, options);
        } catch (err) {
            _log(err)
        }
    }
}
