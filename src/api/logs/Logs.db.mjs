'use strict';

import AbstractDB from '../../db/AbstractDB.mjs';
import { logsModel } from './Logs.schema.mjs';


export default class LogsDB extends AbstractDB {
    constructor(id) {
        super(logsModel);
        this.id = id;
    }

// ********** GET **********

    // async findOne(query, projections = {}, options = {}) {
    //     try {
    //         return await super.findOne(logsModel, query, projections, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

    async find(query, projections = {}, options = {}) {
        try {
            return await super.find(logsModel, query, projections, options);
        } catch (err) {
            _log(err)
        }
    }

// ********** POST **********

    async createOne(data, options = {}) {
        try {
            return await super.createOne(logsModel, data, options);
        } catch (err) {
            _log(err)
        }
    }

    // async createMany(data, options = {}) {
    //     try {
    //         return await super.createMany(logsModel, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** PUT **********

    // async updateOne(query, data, options = {}) {
    //     try {
    //         return await super.updateOne(logsModel, query, data, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

// ********** DELETE **********

    // async deleteOne(query, options = {}) {
    //     try {
    //         return await super.deleteOne(logsModel, query, options);
    //     } catch (err) {
    //         _log(err)
    //     }
    // }

    async deleteMany(query, options = {}) {
        try {
            return await super.deleteMany(logsModel, query, options);
        } catch (err) {
            _log(err)
        }
    }
}
